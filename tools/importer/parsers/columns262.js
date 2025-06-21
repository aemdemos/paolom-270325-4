/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Columns (columns262)'];

  // Find the main grid inside the columns block
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find the row containing the columns
  let columnsRow = null;
  const gridChildren = Array.from(grid.children);
  for (const child of gridChildren) {
    if (child.querySelector('.container__items')) {
      columnsRow = child.querySelector('.container__items');
      break;
    }
  }
  if (!columnsRow) return;

  const columnElems = Array.from(columnsRow.querySelectorAll(':scope > .aem__component > .container__item'));
  const columnCells = columnElems.map((col) => {
    // get the main .text block or the item itself if .text doesn't exist
    const textDiv = col.querySelector('.text') || col;
    return textDiv;
  });

  // Only the columnCells row, no heading in columns row
  // According to the example, the heading is part of the first column content.
  // In this HTML, the first column is only a heading, so we merge it with the heading
  // Find heading (if present), and if so, place it as the first column
  let headingCell = null;
  const headingContainer = gridChildren.find((c) => c.classList.contains('column-heading'));
  if (headingContainer) {
    // Look for a heading (h2) inside
    const h2 = headingContainer.querySelector('h2');
    if (h2) {
      headingCell = h2;
    } else {
      // fallback: look for any strongly styled text
      const strong = headingContainer.querySelector('b, strong');
      if (strong) headingCell = strong;
    }
  }
  // If the first column is NOT the heading, prepend it
  if (headingCell) {
    // Place the heading as the FIRST column
    columnCells.unshift(headingCell);
  }

  // According to the example, only one header row, and one row of columns
  const tableRows = [headerRow, columnCells];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
