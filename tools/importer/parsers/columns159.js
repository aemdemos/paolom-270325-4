/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, must match example exactly
  const headerRow = ['Columns (columns159)'];

  // Get the main container for columns
  const main = element.querySelector('.container__items.container__main');
  if (!main) return;

  // Find all direct column items
  const columns = Array.from(main.querySelectorAll(':scope > .container__item.container__main__element'));
  if (!columns.length) return;

  // Each column's content is inside div.box--top > div.text.parbase > div
  // Reference existing elements directly
  const row = columns.map(col => {
    const boxTop = col.querySelector(':scope > .box--top');
    if (boxTop) {
      // Find the content container
      const textParbase = boxTop.querySelector(':scope > .text.parbase > div');
      if (textParbase) {
        return textParbase;
      }
      // fallback: use boxTop if structure is unexpected
      return boxTop;
    }
    // fallback: use column if structure is unexpected
    return col;
  });

  // Compose table block
  const cells = [
    headerRow,
    row
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
