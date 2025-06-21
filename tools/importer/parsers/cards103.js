/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match exactly
  const headerRow = ['Cards (cards103)'];
  const cells = [headerRow];

  // 2. Find each card (each .container__item)
  const cardElements = Array.from(element.querySelectorAll('.container__item'));

  cardElements.forEach((cardEl) => {
    // Get image element (img inside .image)
    let imageEl = null;
    const img = cardEl.querySelector('.image img');
    if (img) imageEl = img;

    // Get text content (inside .text)
    let textNodes = [];
    const textEl = cardEl.querySelector('.text');
    if (textEl) {
      // Find heading (h1-6)
      const heading = textEl.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textNodes.push(heading);
      // Find all paragraphs (p)
      const paragraphs = Array.from(textEl.querySelectorAll('p'));
      paragraphs.forEach((p) => {
        textNodes.push(p);
      });
      // If there is no heading and no paragraphs, but there is text, add it as a fallback
      if (textNodes.length === 0 && textEl.textContent.trim()) {
        const fallback = document.createElement('span');
        fallback.textContent = textEl.textContent.trim();
        textNodes.push(fallback);
      }
    }
    // If there's no text at all, add an empty span
    if (!textEl || textNodes.length === 0) {
      textNodes.push(document.createElement('span'));
    }
    
    // Compose the row: [image, textNodes]
    cells.push([imageEl, textNodes]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
