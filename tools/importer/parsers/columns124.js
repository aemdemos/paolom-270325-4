/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row should match the exact block name
  const headerRow = ['Columns (columns124)'];

  // 2. Find the main grid - it has two columns
  // Defensive: if the structure changes slightly, handle gracefully
  let leftCell = null;
  let rightCell = null;

  // The grid contains .container__main and .container__aside as the two columns
  const grid = element.querySelector('.grid');
  if (grid) {
    // Main (left) column - usually the image
    const leftCol = grid.querySelector('.container__main .container__item');
    if (leftCol) leftCell = leftCol;

    // Aside (right) column - usually text and links
    const rightCol = grid.querySelector('.container__aside .container__item');
    if (rightCol) rightCell = rightCol;
  }

  // Fallback if .grid not found or columns missing
  if (!leftCell || !rightCell) {
    // Try to get from .border > .container__items
    const border = element.querySelector('.border');
    if (border) {
      const items = border.querySelectorAll('.container__items .container__item');
      leftCell = leftCell || items[0] || null;
      rightCell = rightCell || items[1] || null;
    }
  }

  // Guarantee at least two columns for the block structure
  // If a cell is missing, use an empty string for that cell
  const columnsRow = [
    leftCell || '',
    rightCell || ''
  ];

  // 3. Build the table and replace the element
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
