/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  const mainContainer = element.querySelector('.container__items.container__main');
  if (!mainContainer) return;
  
  // Find all direct column items
  const columnItems = mainContainer.querySelectorAll(':scope > .container__item.container__main__element');
  if (!columnItems.length) return;

  // For each column, get the direct .text.parbase block (or the container itself)
  const columnsRow = Array.from(columnItems).map(col => {
    // Reference the .text.parbase div, or fallback to the column element itself
    const textBlock = col.querySelector('.text.parbase') || col;
    return textBlock;
  });

  // Build the block table: header, then a row with all column cells
  const cells = [
    ['Columns (columns110)'],
    columnsRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
