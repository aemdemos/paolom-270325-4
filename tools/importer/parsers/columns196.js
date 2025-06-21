/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate children that represent columns
  // These are .container__items (main, aside) under .grid
  const grid = element.querySelector('.grid');
  if (!grid) return;

  const columnNodes = Array.from(grid.querySelectorAll(':scope > .container__items'));

  // Defensive: skip block if no columns
  if (!columnNodes.length) return;

  // For each column, extract the main content block (the .box--top inside nested containers)
  const columns = columnNodes.map(col => {
    const aemComp = col.querySelector('.aem__component');
    if (aemComp) {
      const containerItem = aemComp.querySelector('.container__item');
      if (containerItem) {
        const boxTop = containerItem.querySelector('.box--top');
        if (boxTop) {
          return boxTop;
        }
      }
    }
    // fallback to the column node if structure is unexpected
    return col;
  });

  // Table header as per block spec
  const headerRow = ['Columns (columns196)'];
  // Table content row: one cell per column
  const contentRow = columns;
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
