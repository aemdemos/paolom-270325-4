/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns: main and aside
  let mainCol = element.querySelector('.container__items.container__main');
  let asideCol = element.querySelector('.container__items.container__aside');

  if (!mainCol) {
    mainCol = document.createElement('div');
  }
  if (!asideCol) {
    asideCol = document.createElement('div');
  }

  // Create the table manually to ensure correct colspan on header
  const table = document.createElement('table');

  // Header row with correct colspan
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns295)';
  th.setAttribute('colspan', '2');
  headerTr.appendChild(th);
  table.appendChild(headerTr);

  // Data row
  const dataTr = document.createElement('tr');
  [mainCol, asideCol].forEach(cell => {
    const td = document.createElement('td');
    td.append(cell);
    dataTr.appendChild(td);
  });
  table.appendChild(dataTr);

  // Replace the element
  element.replaceWith(table);
}
