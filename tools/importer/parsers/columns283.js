/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .grid element containing the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // The grid contains two immediate .clearfix children, each for a column
  const columns = grid.querySelectorAll(':scope > .clearfix');
  if (columns.length < 2) return;

  // Left column (image/illustration)
  let leftCell;
  const leftContainer = columns[0].querySelector('.container__items');
  if (leftContainer) {
    // Try to get meaningful content inside
    // Usually there's a .textimage or a .text or image
    const leftContent = leftContainer.querySelector('.textimage, .image-text, .text, img');
    leftCell = leftContent ? leftContent : leftContainer;
  } else {
    leftCell = columns[0];
  }

  // Right column (text content)
  let rightCell;
  const rightContainer = columns[1].querySelector('.container__items');
  if (rightContainer) {
    // Try to get meaningful content inside
    // Usually there's a .textimage or a .text block
    const rightContent = rightContainer.querySelector('.textimage, .image-text, .text');
    rightCell = rightContent ? rightContent : rightContainer;
  } else {
    rightCell = columns[1];
  }

  // Table header must match the requested block name
  const headerRow = ['Columns (columns283)'];
  // Row for two columns
  const cellsRow = [leftCell, rightCell];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  element.replaceWith(block);
}
