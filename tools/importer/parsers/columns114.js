/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column content elements
  let columnElements = [];
  const mainItemsContainer = element.querySelector('.container__items.container__main');
  if (mainItemsContainer) {
    const aemComponent = mainItemsContainer.querySelector('.aem__component');
    if (aemComponent) {
      columnElements = Array.from(aemComponent.querySelectorAll(':scope > .container__item.container__main__element'));
    }
  }
  // Fallback for variations
  if (columnElements.length === 0) {
    columnElements = Array.from(element.querySelectorAll('.container__item.container__main__element'));
  }
  if (columnElements.length === 0) return;
  // Each column: Use the innermost .text.parbase if present; else all child nodes
  const columns = columnElements.map(item => {
    const text = item.querySelector('.text.parbase');
    if (text) {
      return text;
    } else {
      return Array.from(item.childNodes);
    }
  });
  // The header row must have a single cell (header) only, not one for each column
  const cells = [
    ['Columns (columns114)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
