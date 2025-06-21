/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container with the columns
  const mainContainer = element.querySelector('.container__items.container__main');
  if (!mainContainer) return;

  // Find all column items
  const columnItems = Array.from(mainContainer.querySelectorAll(':scope > .container__item'));
  if (!columnItems.length) return;

  // The first item is the heading
  const headingItem = columnItems[0];
  let headingContent;
  if (headingItem) {
    // Use .text element if present, otherwise div as fallback
    headingContent = headingItem.querySelector('.text') || headingItem;
  } else {
    headingContent = document.createElement('div');
  }

  // All other items are columns (skip first item)
  const columns = columnItems.slice(1).map(col => {
    const text = col.querySelector('.text');
    // If .text exists, use it, else fallback to col itself
    return text || col;
  });

  // The header row as per instructions
  const cells = [
    ['Columns (columns190)'],
    [headingContent, ...columns]
  ];

  // Create and replace with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
