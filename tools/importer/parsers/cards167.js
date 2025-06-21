/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards167)'];
  const rows = [headerRow];
  // Find all card wrappers (each one is a card)
  const cardEls = element.querySelectorAll('.container__item.container__main__element');
  cardEls.forEach((cardEl) => {
    // 1st column: image (if present)
    let imgEl = null;
    const imgContainer = cardEl.querySelector('.image');
    if (imgContainer) {
      const img = imgContainer.querySelector('img');
      if (img) {
        imgEl = img;
      }
    }

    // 2nd column: text content
    // Use all children of .text (order preserved)
    const textContainer = cardEl.querySelector('.text');
    let textContent = [];
    if (textContainer) {
      // Only add children (not textContent) to preserve tags and order
      textContent = Array.from(textContainer.children).filter(e => e);
    }
    // Each row is [image, [text elements]]
    const row = [imgEl, textContent];
    rows.push(row);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
