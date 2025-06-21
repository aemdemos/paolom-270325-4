/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container for columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find main and aside columns
  const mainColumn = grid.querySelector('.container__main');
  const asideColumn = grid.querySelector('.container__aside');

  // Defensive extraction for left (main) content
  let leftCell = null;
  if (mainColumn) {
    const boxTop = mainColumn.querySelector('.box--top');
    leftCell = boxTop || mainColumn;
  } else {
    leftCell = document.createTextNode('');
  }

  // Defensive extraction for right (aside) content
  let rightCell = null;
  if (asideColumn) {
    const boxTop = asideColumn.querySelector('.box--top');
    rightCell = boxTop || asideColumn;
  } else {
    rightCell = document.createTextNode('');
  }

  // Compose header row as a single cell, second row as two columns
  const headerRow = ['Columns (columns206)'];
  const columnsRow = [leftCell, rightCell];
  const cells = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // After creation, set colspan on the header row so it visually spans both columns
  const th = table.querySelector('th');
  if (th && columnsRow.length > 1) {
    th.setAttribute('colspan', columnsRow.length);
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
