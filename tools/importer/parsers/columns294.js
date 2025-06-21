/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the column content
  let columnsContent = [];
  const grid = element.querySelector('.grid');
  if (grid) {
    const clearfix = grid.querySelector('.clearfix');
    if (clearfix) {
      const items = clearfix.querySelector('.container__items.container__main');
      if (items) {
        const component = items.querySelector('.aem__component');
        if (component) {
          columnsContent = Array.from(component.querySelectorAll('.container__item.container__main__element.none'))
            .map(col => {
              const richContent = col.querySelector('.text.parbase');
              if (richContent && richContent.textContent.trim().length > 0) {
                return richContent;
              } else if (col.textContent.trim().length > 0 || col.children.length > 0) {
                return col;
              }
              return null;
            })
            .filter(Boolean);
        }
      }
    }
  }
  if (!columnsContent.length) {
    columnsContent = Array.from(element.querySelectorAll('.container__items.container__main .text.parbase'))
      .filter(el => el.textContent.trim().length > 0);
  }
  if (!columnsContent.length) {
    columnsContent = Array.from(element.querySelectorAll('.text.parbase'))
      .filter(el => el.textContent.trim().length > 0);
  }

  // The header row must have the same number of columns as the content row, block name in first cell, rest empty
  const numCols = columnsContent.length || 1;
  const headerRow = Array(numCols).fill('');
  headerRow[0] = 'Columns (columns294)';

  const rows = [headerRow];
  if (columnsContent.length) {
    rows.push(columnsContent);
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
