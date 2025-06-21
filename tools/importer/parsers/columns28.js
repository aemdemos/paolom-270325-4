/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the columns row
  const row = element.querySelector('.rowcontainer__row');
  if (!row) return;
  // Get all immediate column children
  const columns = Array.from(row.querySelectorAll(':scope > .rowcontainer__column'));
  if (!columns.length) return;

  // For each column, take the inner .linkmultifield.anz-component (if present)
  // This includes heading and its list
  const contentRow = columns.map(col => {
    const block = col.querySelector('.linkmultifield.anz-component');
    // If that doesn't exist, fallback to the full column
    return block || col;
  });

  // Build the table: header, then column content row
  const cells = [
    ['Columns (columns28)'],
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
