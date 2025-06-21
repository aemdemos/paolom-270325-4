/* global WebImporter */
export default function parse(element, { document }) {
  // Find all column containers (should be two for columns121 layout)
  const colDivs = element.querySelectorAll(':scope > .container__items');
  const columns = [];

  colDivs.forEach((colDiv) => {
    const comp = colDiv.querySelector(':scope > .aem__component');
    let content = null;
    if (comp) {
      const item = comp.querySelector(':scope > .container__item');
      if (item) {
        const firstChild = item.querySelector(':scope > *');
        if (firstChild) {
          content = firstChild;
        } else {
          content = item;
        }
      } else {
        content = comp;
      }
    } else {
      content = colDiv;
    }
    columns.push(content);
  });

  // Ensure there are at least two columns (fill extra with empty divs)
  while (columns.length < 2) {
    columns.push(document.createElement('div'));
  }

  // Build table rows: one header cell, then the columns
  const rows = [];
  rows.push(['Columns (columns121)']); // Header row: exactly one cell, as per spec
  rows.push(columns);
  
  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
