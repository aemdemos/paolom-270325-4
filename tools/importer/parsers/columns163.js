/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid containing the actual columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // The .container__items.container__main holds the three main columns
  const main = grid.querySelector('.container__items.container__main');
  if (!main) return;

  // Each column is a .aem__component > .container__item
  const colItems = Array.from(main.querySelectorAll(':scope > .aem__component > .container__item'));
  if (!colItems.length) return;

  // For each column, gather all .text.parbase blocks (there may be only one per column)
  const columns = colItems.map(col => {
    // Get all .text.parbase direct children (in this HTML, each one contains icon, heading, links)
    return Array.from(col.querySelectorAll(':scope > .text.parbase'));
  });

  // Prepare header row: an array with single cell, but create placeholder empty cells so the table library will set colspan correctly
  const headerRow = ['Columns (columns163)'];
  for (let i = 1; i < columns.length; i++) headerRow.push('');

  // Second row: one cell per column, each referencing the array of elements (or single element)
  const contentRow = columns.map(colContent => colContent.length === 1 ? colContent[0] : colContent);

  // Build and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
