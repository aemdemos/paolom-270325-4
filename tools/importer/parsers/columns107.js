/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header
  const headerRow = ['Columns (columns107)'];

  // Find the grid containing columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Get all child .container__items (these are the columns)
  const columnNodes = Array.from(grid.querySelectorAll(':scope > .container__items'));
  const columns = [];

  // For each column, grab the .box--top content (or fallback to .container__item)
  columnNodes.forEach((container) => {
    let content = '';
    const aemComponent = container.querySelector(':scope > .aem__component');
    if (aemComponent) {
      const item = aemComponent.querySelector(':scope > .container__item');
      if (item) {
        const boxTop = item.querySelector(':scope > .box--top');
        if (boxTop && boxTop.childNodes.length > 0) {
          content = boxTop;
        } else {
          content = item;
        }
      }
    }
    columns.push(content);
  });

  // Build the block table if columns found
  if (columns.length) {
    const rows = [headerRow, columns];
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
