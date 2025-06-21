/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns by structure
  // Left: .container__items.container__main
  // Right: .container__items.container__aside
  const columns = [];
  // Get the left/main column content
  const mainCol = element.querySelector('.container__items.container__main');
  if (mainCol) {
    // Select the direct main content div
    const mainContent = mainCol.querySelector('.container__main__element');
    if (mainContent) columns.push(mainContent);
    else columns.push(document.createElement('div'));
  } else {
    columns.push(document.createElement('div'));
  }
  // Get the right/aside column content
  const asideCol = element.querySelector('.container__items.container__aside');
  if (asideCol) {
    const asideContent = asideCol.querySelector('.container__aside__element');
    if (asideContent) columns.push(asideContent);
    else columns.push(document.createElement('div'));
  } else {
    columns.push(document.createElement('div'));
  }
  // Block table: header + 1 row with both columns
  const headerRow = ['Columns (columns203)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
