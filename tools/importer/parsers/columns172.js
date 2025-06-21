/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Locate the direct column blocks from the provided HTML structure
  const columnsRoot = element.querySelector('.container__items.container__main');
  if (!columnsRoot) return;

  // Step 2: Get all the direct child columns
  const columnItems = Array.from(columnsRoot.querySelectorAll(':scope > .container__item'));
  if (columnItems.length === 0) return;

  // Step 3: For each column, extract the primary box content (which holds the visible content)
  const columnCells = columnItems.map(col => {
    // The content is always inside box--top
    const boxTop = col.querySelector('.box--top');
    // If present, use it; otherwise, fallback to the column item (should not happen)
    return boxTop || col;
  });

  // Step 4: Build the block table per spec, referencing the exact header
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns172)'],
    columnCells
  ], document);

  // Step 5: Replace the original element with the new table
  element.replaceWith(table);
}
