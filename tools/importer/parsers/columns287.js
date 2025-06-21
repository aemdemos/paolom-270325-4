/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the columns structure: two main columns (left and right)
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Get the two column containers
  const mainCol = grid.querySelector('.container__items.container__main');
  const asideCol = grid.querySelector('.container__items.container__aside');

  // Left column content: grab the first non-empty .text.parbase
  let leftCell = null;
  if (mainCol) {
    // Find the first .text.parbase in the left column
    leftCell = mainCol.querySelector('.text.parbase');
  }

  // Right column content: all .text.parbase in aside
  let rightCellChildren = [];
  if (asideCol) {
    rightCellChildren = Array.from(asideCol.querySelectorAll('.text.parbase'));
  }

  // If there is no left or right cell content, substitute empty placeholders (to preserve cell count)
  const left = leftCell || document.createTextNode('');
  const right = rightCellChildren.length > 0 ? rightCellChildren : '';

  // Table header row must match the block name exactly
  const headerRow = ['Columns (columns287)'];
  // Content row: two columns (cells)
  const contentRow = [left, right];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
