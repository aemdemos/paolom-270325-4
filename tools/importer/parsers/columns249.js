/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;
  
  // Find the two columns by their container__items class
  const columns = grid.querySelectorAll('.container__items');
  if (!columns.length) return;

  // For each of the two columns, find the main content block
  const cells = [];
  for (let i = 0; i < 2; i++) {
    const col = columns[i];
    if (!col) {
      // If column is missing, insert empty div for resiliency
      cells.push(document.createElement('div'));
      continue;
    }
    const content = col.querySelector('.aem__component .container__item .text.parbase');
    if (content) {
      cells.push(content);
    } else {
      // If column is empty, insert empty div for resiliency
      cells.push(document.createElement('div'));
    }
  }

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns249)'],
    cells,
  ], document);

  // Replace the original element with the structured table block
  element.replaceWith(table);
}
