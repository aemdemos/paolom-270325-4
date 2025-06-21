/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for columns block, exactly as required
  const headerRow = ['Columns (columns82)'];

  // Find the .grid that houses the column items
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Each column is in .container__item.container__main__element.none
  const columnEls = Array.from(grid.querySelectorAll(':scope > .clearfix > .container__items > .aem__component > .container__item.container__main__element.none'));

  // Defensive: If not found, fallback to less strict selector
  let columns = columnEls;
  if (!columns.length) {
    columns = Array.from(grid.querySelectorAll('.container__item.container__main__element.none'));
  }
  if (!columns.length) return;

  // For each column, use its inner content for the cell
  // If it contains a single wrapper (e.g. .text, .textimage), use that, else the item
  const contentCells = columns.map((col) => {
    // Find the first true content child (not a wrapper)
    const mainChild = col.firstElementChild;
    return mainChild ? mainChild : col;
  });

  // The block should have one header row, then one row with one cell per column (no extras)
  const cells = [
    headerRow,
    contentCells
  ];

  // Create the table and replace the input element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
