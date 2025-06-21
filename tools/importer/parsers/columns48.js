/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct children that are columns
  const colContainers = element.querySelectorAll(':scope > .container__items');
  const columns = [];
  colContainers.forEach((col) => {
    // .aem__component -> .container__item -> .box--top is the usual nesting
    const component = col.querySelector(':scope > .aem__component');
    let cellContent = null;
    if (component) {
      const item = component.querySelector(':scope > .container__item');
      if (item) {
        const box = item.querySelector(':scope > .box--top');
        if (box) {
          cellContent = box;
        } else {
          cellContent = item;
        }
      } else {
        cellContent = component;
      }
    } else {
      cellContent = col;
    }
    columns.push(cellContent);
  });

  // The block name (header) must be exactly as described
  const headerRow = ['Columns (columns48)'];
  const bodyRow = columns;

  // Only one block/table as in the example
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
