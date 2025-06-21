/* global WebImporter */
export default function parse(element, { document }) {
  // Find column containers
  const columnNodes = Array.from(element.querySelectorAll(':scope > .container__items'));

  // For each column, extract the main image (per the input HTML structure)
  const contentRow = columnNodes.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });

  // Only ONE header cell in the header row, regardless of column count
  const tableRows = [
    ['Columns (columns197)'], // single header cell
    contentRow               // one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
