/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns: each .container__item.container__main__element
  const columns = Array.from(element.querySelectorAll(':scope .container__item.container__main__element'));
  // Build array for cell contents, referencing their .text.parbase child (all content in this block)
  const cellContents = columns.map(col => {
    // If .text.parbase exists, use that. Fallback to the column if not found.
    const content = col.querySelector('.text.parbase');
    return content || col;
  });

  // Header row: block name in a SINGLE column (array with one string)
  const headerRow = ['Columns (columns102)'];
  // Content row: an array of as many columns as needed (each is a cell)
  const contentRow = cellContents;
  // Correct structure: header row is 1 cell, next row is N cells
  const blockRows = [headerRow, contentRow];

  // Create table with these rows
  const table = WebImporter.DOMUtils.createTable(blockRows, document);
  // Replace the original element
  element.replaceWith(table);
}