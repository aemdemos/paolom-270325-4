/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the container holding all columns
  const container = element.querySelector('.container__items.container__main');
  if (!container) return;
  // 2. Get all direct column elements
  const columns = Array.from(container.querySelectorAll(':scope > .container__item.container__main__element'));
  if (!columns.length) return;

  // 3. For each column, try to find its primary content (usually in .box--top)
  const contentCells = columns.map(col => {
    // Find .box--top or fallback to firstElementChild
    let mainContent = col.querySelector('.box--top');
    if (!mainContent) {
      // fallback for image column, which doesn't have .box--top
      // use first .text or just firstElementChild
      mainContent = col.querySelector('.text') || col.firstElementChild;
    }
    // Defensive: exclude empty wrappers
    if (mainContent && mainContent.textContent.trim() === '' && mainContent.children.length === 0) {
      return '';
    }
    return mainContent || '';
  });

  // 4. Build cells for the columns block
  const tableRows = [
    ['Columns (columns133)'], // Header matches example
    contentCells
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}