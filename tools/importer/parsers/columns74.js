/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  const container = element.querySelector('.container__items.container__main');
  if (!container) return;

  // The content columns are immediate children of .aem__component inside .container__items
  const aemComponent = container.querySelector('.aem__component');
  if (!aemComponent) return;

  // Each column is a .container__item.container__main__element.none
  const columnNodes = Array.from(aemComponent.querySelectorAll(':scope > .container__item.container__main__element.none'));
  if (columnNodes.length === 0) return;

  // For each column, we want to reference its main content (first child of .container__item)
  // If empty, we should use the whole item (shouldn't happen but for safety)
  const columns = columnNodes.map((col) => {
    // If the column has exactly one direct child, just use it for simplicity
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, use the whole column
    return col;
  });

  // Build the table: header row then a row with each column
  const cells = [
    ['Columns (columns74)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
