/* global WebImporter */
export default function parse(element, { document }) {
  // Find columns within the .grid container
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Get both columns' content (left and right)
  const mainCol = grid.querySelector('.container__items.container__main');
  const asideCol = grid.querySelector('.container__items.container__aside');

  let leftCell, rightCell;
  // Left content
  if (mainCol) {
    const leftEl = mainCol.querySelector('.container__item.container__main__element');
    leftCell = leftEl || mainCol;
  } else {
    leftCell = document.createTextNode('');
  }
  // Right content
  if (asideCol) {
    const rightEl = asideCol.querySelector('.container__item.container__aside__element');
    rightCell = rightEl || asideCol;
  } else {
    rightCell = document.createTextNode('');
  }

  // Compose correct rows: header is a single cell in its own row (spanning columns), content is one row with two cells
  const rows = [
    ['Columns (columns166)'], // header row: single cell
    [leftCell, rightCell],    // content row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
