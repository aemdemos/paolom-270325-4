/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  let grid = element.querySelector('.container--two-columns .grid');
  if (!grid) {
    grid = element.querySelector('.grid');
  }
  if (!grid) return;

  // Get content columns
  const cols = Array.from(grid.children).filter(el => el.nodeType === 1);
  const mainCol = cols.find(col => col.querySelector('.container__main__element'));
  const asideCol = cols.find(col => col.querySelector('.container__aside__element'));

  // Get content for each column
  const mainCell = mainCol ? (mainCol.querySelector('.container__main__element .box--top') || mainCol) : document.createElement('div');
  const asideCell = asideCol ? (asideCol.querySelector('.container__aside__element .box--top') || asideCol) : document.createElement('div');

  // Ensure header row is a single cell as per requirements
  const cells = [
    ['Columns (columns255)'],
    [mainCell, asideCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
