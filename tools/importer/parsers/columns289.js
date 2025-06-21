/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid that contains the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // 2. Get all direct child columns with actual content
  const allCols = Array.from(grid.querySelectorAll('.container__item.container__main__element'));
  // Only keep those with real content inside
  const cols = allCols.filter(col => col.textContent.trim().length > 0 || col.querySelector('img,ul,ol,li,a,p,div'));
  if (!cols.length) return;

  // 3. The header row must be a single cell array
  const headerRow = ['Columns (columns289)'];
  // 4. The content row should have as many cells as columns
  const contentRow = cols;
  // 5. Build the 2D cells array
  const cells = [headerRow, contentRow];

  // 6. Create the table block using the helper
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace the original element with the block table
  element.replaceWith(table);
}
