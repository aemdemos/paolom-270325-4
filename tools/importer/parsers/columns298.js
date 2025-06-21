/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  const mainContainer = element.querySelector('.container__items.container__main');
  if (!mainContainer) return;
  // The columns are inside .aem__component > .container__item.container__main__element
  let columns = [];
  const component = mainContainer.querySelector('.aem__component');
  if (component) {
    columns = Array.from(component.querySelectorAll(':scope > .container__item.container__main__element'));
  } else {
    columns = Array.from(mainContainer.querySelectorAll(':scope > .container__item.container__main__element'));
  }

  // Each column's content: get the first direct .text.parbase inside, fallback to full column
  const columnsRow = columns.map((col) => {
    const mainContent = col.querySelector(':scope > .text.parbase');
    if (mainContent) {
      return mainContent;
    }
    return col;
  });

  // Header row
  const headerRow = ['Columns (columns298)'];

  // Only build a table if there is at least one column
  if (columnsRow.length > 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      columnsRow
    ], document);
    element.replaceWith(table);
  }
}
