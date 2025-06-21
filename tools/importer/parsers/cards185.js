/* global WebImporter */
export default function parse(element, { document }) {
  // Start with header
  const headerRow = ['Cards (cards185)'];
  const rows = [headerRow];
  // Find all cards (direct children under .container__items)
  const containerItems = element.querySelectorAll('.container__items .container__item.container__main__element');
  containerItems.forEach((item) => {
    // Card structure: .box--top > div > .text.parbase
    const textParbase = item.querySelector('.box--top .text.parbase');
    if (!textParbase) return; // skip if structure is broken
    // First cell: image (first img under .text.parbase, or null)
    const img = textParbase.querySelector('img');
    // Second cell: div with all children except the first image-containing <p>
    // (to preserve structure and enable referencing existing nodes)
    let textCellNodes = [];
    Array.from(textParbase.children).forEach((child) => {
      // Skip <p> containing only the <img>
      if (
        child.tagName.toLowerCase() === 'p' &&
        child.querySelector('img') &&
        child.childElementCount === 1 &&
        child.textContent.trim() === ''
      ) {
        // This is the image paragraph, skip
        return;
      }
      textCellNodes.push(child);
    });
    // If nothing left, ensure at least empty string (avoid empty cell)
    if (textCellNodes.length === 0) textCellNodes = [''];
    rows.push([img, textCellNodes]);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
