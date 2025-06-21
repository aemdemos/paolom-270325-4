/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns: main and aside
  const main = element.querySelector(':scope > .container__items.container__main');
  const aside = element.querySelector(':scope > .container__items.container__aside');
  const columns = [];
  if (main) {
    const mainText = main.querySelector('.text.parbase');
    columns.push(mainText || main);
  }
  if (aside) {
    const asideText = aside.querySelector('.text.parbase');
    columns.push(asideText || aside);
  }
  // Fallback if missing
  if (columns.length === 0) {
    const allItems = element.querySelectorAll(':scope > .container__items');
    allItems.forEach(item => {
      const block = item.querySelector('.text.parbase');
      columns.push(block || item);
    });
  }
  // Build the cells array: header row is a single cell, 2nd row has all columns
  const cells = [
    ['Columns (columns217)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
