/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  let columnsContainer = element.querySelector('.container__items.container__main');
  if (!columnsContainer) {
    columnsContainer = element.querySelector('[class*=container__items]');
  }
  
  // Get all .container__item columns
  let columnDivs = [];
  if (columnsContainer) {
    columnDivs = Array.from(columnsContainer.children).filter(e => e.classList.contains('container__item'));
  }
  if (columnDivs.length === 0) {
    columnDivs = Array.from(element.querySelectorAll('.container__item'));
  }
  if (columnDivs.length === 0) {
    // No columns found, just output a 1-row, 1-col table
    element.replaceWith(WebImporter.DOMUtils.createTable([
      ['Columns (columns288)'],
    ], document));
    return;
  }
  // For each column, extract the content (remove .match-height--separator)
  const columnsCells = columnDivs.map(col => {
    Array.from(col.querySelectorAll('.match-height--separator')).forEach(e => e.remove());
    let contentElem = col.querySelector('.box--top');
    if (contentElem && contentElem.textContent.trim() === '' && contentElem.querySelector('.text')) {
      contentElem = contentElem.querySelector('.text');
    }
    if (!contentElem || contentElem.textContent.trim() === '') {
      contentElem = col;
    }
    if (contentElem.textContent.trim() === '' && col.querySelector('.text')) {
      contentElem = col.querySelector('.text');
    }
    if (!contentElem.textContent.trim()) {
      return '';
    }
    return contentElem;
  });
  // The critical fix: header row must be a single cell (one column), not the same number of columns as columnsCells
  const rows = [
    ['Columns (columns288)'], // single-cell header row
    columnsCells // second row: one cell per column
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
