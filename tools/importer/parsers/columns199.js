/* global WebImporter */
export default function parse(element, { document }) {
  // Select all column containers
  const columnContainers = element.querySelectorAll(':scope > .container__items');
  // Extract content for each column
  const columns = [];
  columnContainers.forEach(col => {
    const component = col.querySelector(':scope > .aem__component');
    if (component) {
      const item = component.querySelector(':scope > .container__item');
      if (item && item.children.length === 1) {
        columns.push(item.firstElementChild);
      } else if (item) {
        columns.push(Array.from(item.children));
      } else {
        columns.push(component);
      }
    } else {
      columns.push(col);
    }
  });
  // Header row: first cell is name, rest are empty, length matches columns
  const headerRow = Array(columns.length).fill('');
  headerRow[0] = 'Columns (columns199)';
  const cells = [
    headerRow,
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
