/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Define the exact header row as required: one cell only
  const headerRow = ['Columns (columns164)'];

  // 2. Find the two columns in order: main and aside
  const grid = element.querySelector('.grid');
  if (!grid) return;
  const border = grid.querySelector('.border');
  if (!border) return;

  const mainCol = border.querySelector('.container__main');
  const asideCol = border.querySelector('.container__aside');

  // Defensive: fallback to empty divs if not found
  let mainCellContent = document.createElement('div');
  let asideCellContent = document.createElement('div');

  if (mainCol) {
    const mainEl = mainCol.querySelector('.container__main__element');
    if (mainEl) {
      const boxTop = mainEl.querySelector('.box--top');
      if (boxTop) {
        boxTop.childNodes.forEach((node) => {
          mainCellContent.appendChild(node);
        });
      } else {
        mainEl.childNodes.forEach((node) => {
          mainCellContent.appendChild(node);
        });
      }
    }
  }
  if (asideCol) {
    const asideEl = asideCol.querySelector('.container__aside__element');
    if (asideEl) {
      const boxTop = asideEl.querySelector('.box--top');
      if (boxTop) {
        boxTop.childNodes.forEach((node) => {
          asideCellContent.appendChild(node);
        });
      } else {
        asideEl.childNodes.forEach((node) => {
          asideCellContent.appendChild(node);
        });
      }
    }
  }

  // 3. Build the table: header row (1 cell), then content row (as many columns as needed)
  const cells = [
    headerRow,
    [mainCellContent, asideCellContent]
  ];

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
