/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the columns block
  const headerRow = ['Columns (columns179)'];

  // Find the .grid container (contains the two columns)
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find the main and aside column elements
  const mainColumn = grid.querySelector('.container__main');
  const asideColumn = grid.querySelector('.container__aside');

  // Helper to extract the content area of each column
  function extractColumnContent(col, contentSelector) {
    if (!col) return document.createElement('div');
    const comp = col.querySelector('.aem__component');
    if (comp) {
      const containerElem = comp.querySelector(contentSelector);
      if (containerElem) {
        // Look for .box--top, which holds the content
        const boxTop = containerElem.querySelector('.box--top');
        if (boxTop) {
          // Reference the actual .box--top (don't clone)
          return boxTop;
        }
      }
    }
    // Fallback: just return the whole col
    return col;
  }

  const leftContent = extractColumnContent(mainColumn, '.container__main__element');
  const rightContent = extractColumnContent(asideColumn, '.container__aside__element');

  // Build the columns table
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
