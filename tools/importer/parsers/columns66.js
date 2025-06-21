/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate columns (should be two for columns66)
  const columns = Array.from(element.querySelectorAll(':scope > .container__items'));

  // For each column, get the core content for the table cell
  const cells = columns.map(col => {
    // Each column's main content is inside the first .box--top
    // Use the .box--top element directly to retain all semantic HTML
    const boxTop = col.querySelector('.box--top');
    // If not found, fallback to the column itself (shouldn't happen, but safe)
    return boxTop || col;
  });

  // Table structure: header row then row of columns
  const tableRows = [
    ['Columns (columns66)'],
    cells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
