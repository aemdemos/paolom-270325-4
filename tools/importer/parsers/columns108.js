/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // The columns are within .container__items.container__main and .container__items.container__aside
  const columns = [];
  const items = grid.querySelectorAll(':scope > .clearfix > .container__items');
  if (items.length === 2) {
    items.forEach((container) => {
      const comp = container.querySelector('.aem__component');
      if (comp) {
        const item = comp.querySelector('.container__item');
        if (item) {
          const boxTop = item.querySelector('.box--top');
          if (boxTop) {
            const textBlock = boxTop.querySelector('.text.parbase');
            if (textBlock) {
              columns.push(textBlock);
            } else {
              columns.push(boxTop);
            }
          } else {
            columns.push(item);
          }
        } else {
          columns.push(comp);
        }
      } else {
        columns.push(container);
      }
    });
  } else {
    // fallback: grab all .container__item under .grid
    const allItems = grid.querySelectorAll('.container__item');
    allItems.forEach((item) => {
      const boxTop = item.querySelector('.box--top');
      if (boxTop) {
        const textBlock = boxTop.querySelector('.text.parbase');
        if (textBlock) {
          columns.push(textBlock);
        } else {
          columns.push(boxTop);
        }
      } else {
        columns.push(item);
      }
    });
  }
  // Always require exactly 2 columns for this block
  while (columns.length < 2) {
    columns.push(document.createTextNode(''));
  }
  // Table header must match exactly
  const cells = [
    ['Columns (columns108)'],
    [columns[0], columns[1]],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
