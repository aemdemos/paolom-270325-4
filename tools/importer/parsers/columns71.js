/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row with exactly one column
  const tableRows = [
    ['Columns (columns71)']
  ];

  // Find the main columns container
  let columnsRoot = element.querySelector('.container__items.container__main');
  if (!columnsRoot) columnsRoot = element;

  // Get all column wrappers in order
  let itemDivs = Array.from(columnsRoot.querySelectorAll(':scope > .aem__component > .container__item, :scope > .container__item'));
  if (itemDivs.length === 0) {
    // fallback to any .container__item (covers some variations)
    itemDivs = Array.from(columnsRoot.querySelectorAll('.container__item'));
  }
  if (itemDivs.length === 0) {
    // fallback: treat everything as one column
    tableRows.push([element]);
    const table = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(table);
    return;
  }

  // Build a content row with as many columns as needed
  const columnCells = itemDivs.map((itemDiv) => {
    // Use the main content container within the column
    const box = itemDiv.querySelector('.box--top') || itemDiv;
    return box;
  });
  tableRows.push(columnCells);

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
