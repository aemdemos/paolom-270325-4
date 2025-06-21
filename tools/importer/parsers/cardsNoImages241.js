/* global WebImporter */
export default function parse(element, { document }) {
  // Only one block/table required - Cards (cardsNoImages241) - no Section Metadata block
  // Find the card content inside the main content column
  const mainCards = [];
  // Locate .container__main, fall back if structure is slightly different
  const main = element.querySelector('.container__main') || element;
  // Find all cardish regions inside .container__main
  // Each card is defined by .textimage.parbase
  const cardEls = main.querySelectorAll('.textimage.parbase');
  cardEls.forEach(cardEl => {
    // For each card, build its content (combine headings, description, cta, etc)
    const textSection = cardEl.querySelector('.text');
    if (!textSection) return; // skip if no text section
    const fragment = document.createElement('div');

    // Heading (usually h1-h6)
    const heading = textSection.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      fragment.appendChild(heading);
    }

    // All paragraphs
    const paragraphs = Array.from(textSection.querySelectorAll('p'));
    paragraphs.forEach(p => {
      // Only include if it has text or children
      if (p.textContent.trim() || p.querySelector('a')) {
        fragment.appendChild(p);
      }
    });

    // This variant is Cards (cardsNoImages241) so omit image content
    mainCards.push([fragment]);
  });

  // If there are no .textimage.parbase, look for cards defined by another convention (robustness)
  if (mainCards.length === 0) {
    // Fallback: look for .container__main__element--eight .text .
    const fallbackCards = main.querySelectorAll('.container__main__element--eight .text');
    fallbackCards.forEach(textSection => {
      const fragment = document.createElement('div');
      const heading = textSection.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) fragment.appendChild(heading);
      const paragraphs = Array.from(textSection.querySelectorAll('p'));
      paragraphs.forEach(p => {
        if (p.textContent.trim() || p.querySelector('a')) {
          fragment.appendChild(p);
        }
      });
      mainCards.push([fragment]);
    });
  }

  // Only create block if we found at least one card
  if (mainCards.length > 0) {
    const headerRow = ['Cards (cardsNoImages241)'];
    const cells = [headerRow, ...mainCards];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
