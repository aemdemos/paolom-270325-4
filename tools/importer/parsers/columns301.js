/* global WebImporter */
export default function parse(element, { document }) {
  // The columns block is rendered as two side-by-side content areas within the .grid
  // Each .container__items is a column (main/aside)
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Get all direct .container__items children of .grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > .container__items'));

  // Defensive: Only process if exactly 2 columns found
  if (columns.length !== 2) return;

  // For each column, find the first '.container__item' inside (holds the actual content)
  const cells = columns.map(col => {
    // There's a .aem__component > .container__item ...
    const item = col.querySelector(':scope > .aem__component > .container__item');
    // If not found, fallback to column itself
    return item || col;
  });

  // Build the block table: first row header, second row = both columns
  const tableData = [
    ['Columns (columns301)'],
    cells
  ];

  // Create table block and replace original element
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
