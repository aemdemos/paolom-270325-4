/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block name, exactly matching example
  const headerRow = ['Columns (columns252)'];

  // To be robust, find the .grid container
  const grid = element.querySelector('.grid');
  let leftContent = null;
  let rightContent = null;

  if (grid) {
    // Main column (left)
    const containerMain = grid.querySelector('.container__items.container__main .container__main__element');
    if (containerMain) {
      // If this is an empty container, set as empty string
      leftContent = containerMain.childNodes.length ? containerMain : '';
    } else {
      leftContent = '';
    }
    // Aside column (right)
    const containerAside = grid.querySelector('.container__items.container__aside .container__aside__element');
    if (containerAside) {
      rightContent = containerAside.childNodes.length ? containerAside : '';
    } else {
      rightContent = '';
    }
  } else {
    // Fallback: no grid found, both columns empty
    leftContent = '';
    rightContent = '';
  }

  // Compose table rows: first row header, second row 2 columns for left/right
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
