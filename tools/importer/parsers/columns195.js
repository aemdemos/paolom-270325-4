/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column elements
  const columns = Array.from(element.querySelectorAll(':scope > .container__items'));
  // For each column, extract the .box--top block (if present)
  const columnContent = columns.map(col => {
    const item = col.querySelector('.container__item');
    if (!item) return document.createElement('div');
    const box = item.querySelector('.box--top');
    return box || item;
  });
  // Header row: single cell, matches example
  const headerRow = ['Columns (columns195)'];
  // Content row: as many columns as blocks found
  const contentRow = columnContent;
  // Compose cells
  const cells = [
    headerRow,
    contentRow
  ];
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
