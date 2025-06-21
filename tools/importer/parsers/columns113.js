/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns
  const columns = Array.from(element.querySelectorAll('.container__item.container__main__element'));

  // For each column, get the main content block
  const columnCells = columns.map((col) => {
    const textBlock = col.querySelector('.text.parbase') || col;
    return textBlock;
  });

  // Create the table with the correct structure: single header cell spanning all columns
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns113)';
  th.colSpan = columnCells.length;
  headerRow.appendChild(th);
  table.appendChild(headerRow);

  const contentRow = document.createElement('tr');
  for (const cell of columnCells) {
    const td = document.createElement('td');
    td.appendChild(cell);
    contentRow.appendChild(td);
  }
  table.appendChild(contentRow);

  element.replaceWith(table);
}
