/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block wrapper that contains the columns
  const main = element.querySelector('.container__items.container__main');
  if (!main) return;

  // Find all direct column children (each .container__item is a column)
  const columnEls = Array.from(main.querySelectorAll(':scope > .container__item'));

  // The columns must be presented as-is: each cell gets the *content* of the column
  // We'll extract the first child under each container__item (usually the block wrapper)
  const contentRow = columnEls.map(col => {
    // If there's a single child, use it
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // If there are multiple children, wrap them in a div to preserve grouping
    if (col.children.length > 1) {
      const div = document.createElement('div');
      Array.from(col.children).forEach(child => div.appendChild(child));
      return div;
    }
    // Fallback: use the col itself if empty
    return col;
  });

  // Make sure we only create a block if there's at least one non-empty column
  const hasContent = contentRow.some(cell => {
    if (!cell) return false;
    // Consider element empty if it contains only whitespace
    return (cell.textContent && cell.textContent.trim().length > 0) || cell.querySelector('img,iframe,video');
  });
  if (!hasContent) return;

  // The header row must match the block name exactly
  const headerRow = ['Columns (columns128)'];

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
