/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct .grid child
  const grid = element.querySelector(':scope > .container > .grid') || element.querySelector('.grid');
  if (!grid) return;

  // The first column is just a heading, then the content columns follow
  const gridChildren = Array.from(grid.children);
  // Find heading block (first col), and main content columns
  let headingCell = null;
  let contentColumns = [];

  // Try to find heading: look for h2/h1 in first child
  if (gridChildren.length > 0) {
    const firstCol = gridChildren[0];
    const heading = firstCol.querySelector('h2, h1');
    if (heading) {
      headingCell = heading;
    }
  }

  // The columns are inside .container__items.container__main
  const colHolder = element.querySelector('.container__items.container__main');
  if (!colHolder) return;
  const columnItems = Array.from(colHolder.querySelectorAll(':scope > .aem__component > .container__item'));

  // For each column, extract the .text.parbase or all children if not present
  contentColumns = columnItems.map(item => {
    const textBlock = item.querySelector('.text.parbase');
    return textBlock || item;
  });

  // Compose columns row: If heading, prepend as a column, otherwise just columns
  let columnsRow;
  if (headingCell) {
    columnsRow = [headingCell, ...contentColumns];
  } else {
    columnsRow = [...contentColumns];
  }

  // Build table with header and column row
  const cells = [
    ['Columns (columns269)'],
    columnsRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
