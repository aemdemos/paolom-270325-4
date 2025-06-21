/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const cells = [['Cards (cards106)']];
  
  // Find the main grid that holds the two columns (image & text)
  const grid = element.querySelector('.grid');
  if (grid) {
    // Left main image column: find the first image inside 'container__main'
    const mainCol = grid.querySelector('.container__main');
    let imageEl = null;
    if (mainCol) {
      // Try to find an <img> within mainCol (works for IE/modern picture fallback)
      imageEl = mainCol.querySelector('img');
    }
    // Right text column: find the .container__aside content
    const asideCol = grid.querySelector('.container__aside');
    let textEl = null;
    if (asideCol) {
      // Use the .text.parbase element if available, otherwise all asideCol content
      const parbase = asideCol.querySelector('.text.parbase');
      textEl = parbase || asideCol;
    }
    // Only push card row if there's at least image or text content
    if (imageEl || textEl) {
      cells.push([
        imageEl || '',
        textEl || ''
      ]);
    }
  }

  // Create table and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
