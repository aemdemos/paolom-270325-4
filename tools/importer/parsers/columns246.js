/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, as required
  const headerRow = ['Columns (columns246)'];

  // Find the grid container that holds all columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find all columns: each .container__item
  const columnElements = Array.from(grid.querySelectorAll('.container__item'));
  if (!columnElements.length) return;

  // For each column, get its .image-text content, otherwise the column itself
  const columnCells = columnElements.map((colEl) => {
    const imageText = colEl.querySelector('.image-text');
    return imageText || colEl;
  });

  // Compose the table data: header (single cell), row with N columns of content
  const tableData = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
