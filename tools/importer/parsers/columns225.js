/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all columns (should be two: main and aside)
  const columns = [];
  const containerItems = element.querySelectorAll(':scope > .container__items');
  containerItems.forEach((container) => {
    const component = container.querySelector(':scope > .aem__component');
    if (component) {
      const item = component.querySelector(':scope > .container__item');
      if (item) {
        // Use the first main content block if it exists
        const mainDiv = item.querySelector(':scope > .textimage, :scope > .text.parbase');
        columns.push(mainDiv || item);
      } else {
        columns.push(component);
      }
    } else {
      columns.push(container);
    }
  });

  // Only create the table if there is at least one column
  if (columns.length) {
    // The header must be a single cell array
    const cells = [
      ['Columns (columns225)'],
      columns
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
