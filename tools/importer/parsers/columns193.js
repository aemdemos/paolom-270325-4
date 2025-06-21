/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find container with column items
  const mainContainer = element.querySelector('.container__items.container__main');
  if (!mainContainer) return;

  // 2. Get all columns (should be direct children)
  const columnDivs = Array.from(mainContainer.querySelectorAll(':scope > .container__item.container__main__element'));
  if (columnDivs.length === 0) return;

  // 3. Prepare table header
  const tableRows = [['Columns (columns193)']];

  // 4. Prepare the columns row - each cell should reference the content block inside each column
  // We want to reference the .text.parbase as the content for each column
  const columnsRow = columnDivs.map(col => {
    const content = col.querySelector('.text.parbase');
    // If content block exists, return it; otherwise, return the column div itself
    return content || col;
  });

  tableRows.push(columnsRow);

  // 5. Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}