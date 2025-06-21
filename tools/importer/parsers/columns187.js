/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .grid container
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find all immediate children that are columns (main & aside)
  const colItems = grid.querySelectorAll('.container__items');
  // Only process the first two columns for this block
  const columns = [];
  for (let i = 0; i < 2; i++) {
    const colWrap = colItems[i];
    if (colWrap) {
      // Find the first .container__item inside
      const colContent = colWrap.querySelector('.container__item');
      if (colContent) {
        columns.push(colContent);
      } else {
        // Fallback: empty div
        columns.push(document.createElement('div'));
      }
    } else {
      columns.push(document.createElement('div'));
    }
  }

  // Table header as required by spec
  const headerRow = ['Columns (columns187)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
