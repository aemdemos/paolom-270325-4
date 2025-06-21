/* global WebImporter */
export default function parse(element, { document }) {
  // Find left column (main)
  const leftColWrap = element.querySelector('.container__items.container__main');
  let leftContent = '';
  if (leftColWrap) {
    const text = leftColWrap.querySelector('.container__item .text');
    leftContent = text || leftColWrap;
  }

  // Find right column (aside)
  const rightColWrap = element.querySelector('.container__items.container__aside');
  let rightContent = '';
  if (rightColWrap) {
    const imageText = rightColWrap.querySelector('.image-text');
    rightContent = imageText || rightColWrap;
  }

  // Compose the cells array.
  // For proper header spanning, the header row is a single-cell array,
  // and the data row is two cells (columns)
  const cells = [
    ['Columns (columns297)'],
    [leftContent, rightContent]
  ];

  // createTable will generate a table with a one-cell header row, and two cells per data row.
  // Rendering systems can interpret the single-header-cell as spanning the full columns.
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: set colspan on the header cell if possible (for strict HTML compliance)
  // Find the header cell (first row, first cell)
  const th = table.querySelector('tr:first-child th');
  if (th && cells[1].length > 1) {
    th.setAttribute('colspan', cells[1].length);
  }

  element.replaceWith(table);
}
