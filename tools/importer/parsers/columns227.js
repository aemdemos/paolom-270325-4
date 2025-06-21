/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const container = element.querySelector('.container__items.container__main');
  if (!container) return;

  // Get all direct child column items
  const items = Array.from(container.querySelectorAll(':scope > .container__item'));

  // For each column, collect ALL visible content blocks, preserving order and text
  function getColumnContent(item) {
    // Gather child elements from the column that have visible or meaningful content
    // This handles <div class="text">, <div class="textimage">, etc.
    const blocks = [];
    Array.from(item.childNodes).forEach((node) => {
      // If element node, only add if not empty
      if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim() !== '' || node.nodeType === Node.ELEMENT_NODE && node.querySelector('img')) {
        blocks.push(node);
      }
      // If text node and not entirely whitespace
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        const span = document.createElement('span');
        span.textContent = node.textContent;
        blocks.push(span);
      }
    });
    return blocks;
  }

  const columnsContent = items.map(getColumnContent);
  // Header must match example exactly
  const headerRow = ['Columns (columns227)'];
  // Second row: each column's content in one cell
  const contentRow = columnsContent;
  const cells = [headerRow, contentRow];

  // Create table and replace the block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
