/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Columns (columns19)'];

  // Find the columns wrapper in the provided HTML
  const mainItemsContainer = element.querySelector('.container__items.container__main');
  if (!mainItemsContainer) return;

  // Get all immediate children of mainItemsContainer (the columns)
  const columnItems = Array.from(mainItemsContainer.children).filter(el => el.classList.contains('container__item'));

  // For each column, gather all non-empty content (text nodes and elements)
  const colCells = columnItems.map(col => {
    // If column is completely empty, skip
    if (!col.textContent.trim() && !col.querySelector('a, img, iframe')) {
      return null;
    }
    // Collect all direct children with content, or, if there are no children, the element itself
    // Also include text nodes for stray text
    const nodes = [];
    col.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Only include if has content
        if (node.textContent.trim() || node.querySelector('a, img, iframe')) {
          nodes.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          const span = document.createElement('span');
          span.textContent = node.textContent;
          nodes.push(span);
        }
      }
    });
    // If we found nodes, use them; else, use the col itself
    if (nodes.length > 0) {
      return nodes.length === 1 ? nodes[0] : nodes;
    }
    return col;
  }).filter(Boolean);

  // If no columns have content, don't proceed
  if (!colCells.length) return;

  // Build the table and replace the original element
  const table = WebImporter.DOMUtils.createTable([headerRow, colCells], document);
  element.replaceWith(table);
}
