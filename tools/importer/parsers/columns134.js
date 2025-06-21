/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns (direct children of the main container)
  const columnNodes = Array.from(
    element.querySelectorAll('.container__item.container__main__element')
  );

  // For each column, extract the .box--top > div > .text content
  const cells = columnNodes.map(col => {
    const content = col.querySelector('.box--top > div > .text');
    return content || col;
  });

  // Build the table rows: header row must be a single cell spanning all columns
  const headerRow = [
    { colspan: cells.length, content: 'Columns (columns134)' }
  ];
  // But WebImporter.DOMUtils.createTable only takes a 2D array --
  // So we must provide an array-of-arrays with a single cell for the header row,
  // and then the content row with as many columns as needed.

  // To set colspan, we have to create the <th> manually then inject into the table

  // We'll create the table first, then patch the header cell
  const rows = [
    ['Columns (columns134)'],
    cells
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Patch the first row's th to have correct colspan
  const headerTh = table.querySelector('tr:first-child th');
  if (headerTh && cells.length > 1) {
    headerTh.setAttribute('colspan', cells.length);
  }

  // Replace original element
  element.replaceWith(table);
}
