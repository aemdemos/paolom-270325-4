/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container holding column items
  const mainContainer = element.querySelector('.container__items.container__main');
  if (!mainContainer) return;

  // Select all direct column elements
  const colEls = Array.from(mainContainer.querySelectorAll(':scope > .container__item.container__main__element'));
  if (colEls.length === 0) return;

  // Each column content will be the inner .text.parbase element, referenced directly
  const columns = colEls.map(col => {
    const textDiv = col.querySelector('.text.parbase');
    // If for some reason a .text.parbase child does not exist, fallback to the col itself
    return textDiv || col;
  });

  // Build the table with header and columns row
  const cells = [
    ['Columns (columns116)'],
    columns
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
