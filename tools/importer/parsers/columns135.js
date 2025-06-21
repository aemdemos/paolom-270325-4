/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find main two columns container in the given HTML structure
  const grid = element.querySelector('.columns .container--two-columns .grid');
  if (!grid) return;

  // 2. Find left and right column containers
  // Search for direct children .container__items under grid > .clearfix
  const clearfixes = grid.querySelectorAll(':scope > .clearfix');
  let leftCol = null;
  let rightCol = null;
  if (clearfixes.length >= 2) {
    // Generally, left (image) comes first, right (text) second
    leftCol = clearfixes[0].querySelector('.container__items');
    rightCol = clearfixes[1].querySelector('.container__items');
  } else {
    // fallback for if both are in one clearfix
    const items = grid.querySelectorAll('.container__items');
    leftCol = items[0] || null;
    rightCol = items[1] || null;
  }

  if (!leftCol || !rightCol) return;

  // 3. Extract left column content (should be the image block)
  // Find the first <img> inside leftCol and use the parent <p> if possible
  let leftContent = null;
  const img = leftCol.querySelector('img');
  if (img) {
    const p = img.closest('p');
    leftContent = p || img;
  } else {
    // fallback: use whole leftCol if can't find image
    leftContent = leftCol;
  }

  // 4. Extract right column content (heading, paragraphs, list)
  // Find the .text.parbase block with content
  let rightContent = null;
  const textBlocks = rightCol.querySelectorAll('.text.parbase');
  for (const block of textBlocks) {
    if (block.textContent.trim()) {
      rightContent = block;
      break;
    }
  }
  if (!rightContent) rightContent = rightCol;

  // 5. Build the header row and cells structure
  const cells = [
    ['Columns (columns135)'],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
