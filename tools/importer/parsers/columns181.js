/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column with the block name
  const headerRow = ['Columns (columns181)'];

  // Get the parent containing the columns
  let container = element.querySelector('.container__items.container__main');
  if (!container) container = element;
  let columnsComponent = container.querySelector('.aem__component');
  if (!columnsComponent) columnsComponent = container;

  // Find all direct column items
  const columnItems = Array.from(columnsComponent.querySelectorAll(':scope > .container__item.container__main__element'));
  if (columnItems.length < 2) return;

  // Prepare content for each column (skip empty <p>)
  const contentCells = [];
  for (let i = 0; i < columnItems.length; i++) {
    const col = columnItems[i];
    const textBlock = col.querySelector('.text') || col;
    const blocks = [];
    Array.from(textBlock.children).forEach(child => {
      if (child.tagName === 'P' && !child.textContent.trim() && child.querySelectorAll('img').length === 0) return;
      blocks.push(child);
    });
    if (blocks.length === 1) {
      contentCells.push(blocks[0]);
    } else {
      contentCells.push(blocks);
    }
  }

  // Compose the table: header row (1 column), then a row with all columns in the second row
  const tableData = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
