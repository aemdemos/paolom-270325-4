/* global WebImporter */
export default function parse(element, { document }) {
  // Find column containers
  const main = element.querySelector('.container__items.container__main');
  const aside = element.querySelector('.container__items.container__aside');

  let mainContent = '';
  let asideContent = '';

  if (main) {
    const item = main.querySelector('.container__item');
    if (item) mainContent = item;
  }

  if (aside) {
    const item = aside.querySelector('.container__item');
    if (item) asideContent = item;
  }

  // Table cell array for the columns
  const columnsRow = [mainContent, asideContent];

  // Manually create table to set colspan on header
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Columns (columns200)';
  headerTh.colSpan = columnsRow.length; // span all columns
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Content row
  const contentTr = document.createElement('tr');
  columnsRow.forEach(cell => {
    const td = document.createElement('td');
    if (cell) td.append(cell);
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  element.replaceWith(table);
}
