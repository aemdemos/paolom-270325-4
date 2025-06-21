/* global WebImporter */
export default function parse(element, { document }) {
  // Table header - must exactly match the required block name
  const headerRow = ['Columns (columns111)'];

  // Columns: find all immediate children that represent columns
  // Look for .container__items that are direct children of the root element
  const columnContainers = Array.from(element.querySelectorAll(':scope > .container__items'));

  // In each column, we want to reference the .text.parbase (which contains heading, text, and link)
  // If .text.parbase is missing, fall back to the column container itself
  const cells = columnContainers.map(col => {
    const textBlock = col.querySelector('.text.parbase');
    return textBlock || col;
  });

  // Only create the table if there is any content
  if (cells.length > 0) {
    const tableData = [headerRow, cells];
    const table = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(table);
  }
}
