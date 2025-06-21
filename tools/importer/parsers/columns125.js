/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the columns block
  const headerRow = ['Columns (columns125)'];

  // Find columns root (two columns are in .container__main and .container__aside)
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Defensive: ensure both columns
  let col1 = null;
  let col2 = null;

  // First column: main content (mostly text)
  const main = grid.querySelector('.container__items.container__main');
  if (main) {
    // Use the direct .aem__component inside main
    const mainComponent = main.querySelector('.aem__component');
    if (mainComponent) {
      col1 = mainComponent;
    } else {
      col1 = main;
    }
  } else {
    col1 = document.createElement('div');
  }

  // Second column: aside content (image, link)
  const aside = grid.querySelector('.container__items.container__aside');
  if (aside) {
    const asideComponent = aside.querySelector('.aem__component');
    if (asideComponent) {
      col2 = asideComponent;
    } else {
      col2 = aside;
    }
  } else {
    col2 = document.createElement('div');
  }

  // Prepare the table rows: header, then one row with the columns
  const rows = [headerRow, [col1, col2]];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
