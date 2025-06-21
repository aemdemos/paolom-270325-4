/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child with a class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find(el => el.classList.contains(className));
  }

  // Find left and right columns
  const leftCol = getDirectChildByClass(element, 'container__main');
  const rightCol = getDirectChildByClass(element, 'container__aside');

  // Defensive: fallback to blank if column missing
  let leftContent = '';
  let rightContent = '';
  if (leftCol) {
    const leftText = leftCol.querySelector('.text.parbase');
    if (leftText) leftContent = leftText;
  }
  if (rightCol) {
    const rightText = rightCol.querySelector('.text.parbase');
    if (rightText) rightContent = rightText;
  }
  // Calculate number of columns for content row
  const contentCells = [leftContent, rightContent].filter(Boolean);
  // Header row should have a single cell (spanning all columns visually)
  const headerRow = ['Columns (columns119)'];
  // Content row: one cell per column
  const contentRow = contentCells;

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
