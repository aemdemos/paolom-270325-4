/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main columns wrapper
  const mainContainer = element.querySelector('.container__items.container__main');
  if (!mainContainer) return;

  // Select all columns (direct children that represent columns)
  const columnElements = Array.from(mainContainer.querySelectorAll(':scope > .container__item.container__main__element'));
  if (columnElements.length === 0) return;

  // For each column, extract the .text.parbase element as a cell
  const cells = [
    ['Columns (columns117)'],
    columnElements.map((col) => {
      // Reference the .text.parbase element directly if present, otherwise the column wrapper itself
      const content = col.querySelector(':scope > .text.parbase');
      return content || col;
    })
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
