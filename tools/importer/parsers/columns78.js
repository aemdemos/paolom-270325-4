/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find all the main content column items
  const itemsParent = grid.querySelector('.container__items.container__main');
  if (!itemsParent) return;
  const columnComps = Array.from(
    itemsParent.querySelectorAll(':scope > .aem__component > .container__item')
  );
  if (!columnComps.length) return;

  // Find the section heading (should be included in the first column cell)
  let heading = null;
  const headingEl = grid.querySelector('.column-heading .container__default__element');
  if (headingEl && headingEl.textContent.trim().length > 0) {
    heading = headingEl;
  }

  // Compose the cells for the columns row
  const columnCells = columnComps.map((col, idx) => {
    const content = col.querySelector('.box--top') || col;
    if (idx === 0 && heading) {
      // Create a wrapper and add heading then content
      const wrapper = document.createElement('div');
      wrapper.append(heading);
      wrapper.append(content);
      return wrapper;
    }
    return content;
  });

  // Construct the header row to match the number of columns
  const headerRow = ['Columns (columns78)'];
  for (let i = 1; i < columnCells.length; i++) {
    headerRow.push('');
  }

  // Build the table array
  const rows = [headerRow, columnCells];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
