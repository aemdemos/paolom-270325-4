/* global WebImporter */
export default function parse(element, { document }) {
  // Find all the main card elements
  const cardEls = Array.from(
    element.querySelectorAll('.container__item.container__main__element')
  );

  const rows = [];
  // Header row as per instructions and example
  rows.push(['Cards (cards247)']);

  cardEls.forEach(card => {
    // Get the image element (mandatory)
    const image = card.querySelector('.image img');
    // Get the text container (mandatory)
    const textContainer = card.querySelector('.text');

    const textNodes = [];
    if (textContainer) {
      // Heading (optional)
      const heading = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textNodes.push(heading);
      // Description (all p tags that do NOT contain a link)
      const ps = Array.from(textContainer.querySelectorAll('p'));
      ps.forEach(p => {
        // Only include <p> elements that do NOT contain an <a>
        if (!p.querySelector('a')) {
          textNodes.push(p);
        }
      });
      // CTA (any p that contains an <a>, only add if not empty)
      ps.forEach(p => {
        if (p.querySelector('a')) {
          textNodes.push(p);
        }
      });
    }
    // Add the row only if there's an image and some text content
    if (image && textNodes.length > 0) {
      rows.push([image, textNodes]);
    }
  });

  // Only create the table if there is at least one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
