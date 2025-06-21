/* global WebImporter */
export default function parse(element, { document }) {
  // Find both column containers (main and aside)
  const columnContainers = element.querySelectorAll(':scope > .container__items');
  const contentRow = [];

  columnContainers.forEach((container) => {
    const item = container.querySelector(':scope > .aem__component > .container__item');
    if (item) {
      const boxTop = item.querySelector(':scope > .box--top');
      if (boxTop && boxTop.children.length) {
        contentRow.push(boxTop);
      } else {
        contentRow.push(item);
      }
    } else {
      contentRow.push(document.createTextNode(''));
    }
  });

  // Create the table structure
  const cells = [];

  // Create a header row that will span all columns (colspan)
  // We'll create the table using createTable (which doesn't support colspan),
  // and then manually adjust the <th> afterwards to set colspan
  cells.push(['Columns (columns171)']);
  cells.push(contentRow);

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set colspan on the header cell to span all columns
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow && contentRow.length > 1) {
    const headerCell = headerRow.querySelector('th');
    if (headerCell) {
      headerCell.setAttribute('colspan', contentRow.length);
    }
  }

  element.replaceWith(table);
}
