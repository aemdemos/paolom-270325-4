/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get a column's content
  function findColumnContent(colRoot) {
    // Prioritize .container__item > .text.parbase, otherwise get largest content block
    const item = colRoot.querySelector('.container__item');
    if (item) {
      const textBlock = item.querySelector('.text.parbase');
      if (textBlock) {
        return textBlock;
      }
      // fallback to item itself
      return item;
    }
    // fallback to colRoot
    return colRoot;
  }

  // Find the two main column containers
  const containers = element.querySelectorAll(':scope > div');
  if (containers.length < 2) return;

  // Left Column (main)
  const leftCol = containers[0];
  const leftContent = findColumnContent(leftCol);

  // Right Column (aside)
  const rightCol = containers[1];
  const rightContent = findColumnContent(rightCol);

  // Compose the table structure
  const headerRow = ['Columns (columns175)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
