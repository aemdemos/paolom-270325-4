/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards212)'];
  const rows = [headerRow];
  // Find all immediate card containers
  const cardElements = Array.from(element.querySelectorAll(':scope > .container__items > .container__item.container__main__element'));
  cardElements.forEach(card => {
    // Find image in card
    let img = null;
    const imgEl = card.querySelector('img');
    if (imgEl) {
      img = imgEl;
    }
    // Find text container
    const textDiv = card.querySelector('.text');
    let textContent = [];
    if (textDiv) {
      // Title (usually h3)
      const h3 = textDiv.querySelector('h3');
      if (h3) {
        textContent.push(h3);
      }
      // All paragraphs, including CTA
      // Only include non-empty paragraphs
      const paragraphs = Array.from(textDiv.querySelectorAll('p')).filter(p => p.textContent.trim() !== '' && p.textContent.trim() !== '\u00a0');
      paragraphs.forEach(p => {
        textContent.push(p);
      });
    }
    // Add the row if we have an image and any text content
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
