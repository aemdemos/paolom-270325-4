/* global WebImporter */
export default function parse(element, { document }) {
  // Set table header exactly as required
  const headerRow = ['Columns (columns293)'];

  // Find the grid
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // The columns are defined as:
  //  - The .column-heading (first column, may have multiple subelements)
  //  - Then all .container__item.container__main__element (subsequent columns)

  // Helper to gather all visible/non-empty children from a node
  function extractAllContent(node) {
    // Flatten all direct children, filter out empty text nodes
    const nodes = Array.from(node.childNodes).filter(n => {
      if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim().length > 0;
      if (n.nodeType === Node.ELEMENT_NODE) return n.textContent.trim().length > 0 || n.querySelector('img,svg,video,iframe');
      return false;
    });
    return nodes.length === 1 ? nodes[0] : nodes;
  }

  // First column: all direct content from .column-heading > .aem__component > .container__default__element (may be empty)
  let firstCol = null;
  const headingContainer = grid.querySelector('.column-heading .container__default__element')
    || grid.querySelector('.column-heading');
  if (headingContainer) {
    // Extract all non-empty content (not just a heading, but also lists, buttons, etc. if present)
    firstCol = extractAllContent(headingContainer);
    // If the element is empty, fallback to the entire container
    if (!firstCol || (Array.isArray(firstCol) && firstCol.length === 0)) {
      firstCol = headingContainer;
    }
  }

  // Subsequent columns: gather all .container__item.container__main__element (and their .text.parbase children)
  const main = grid.querySelector('.container__items.container__main');
  const columns = [];

  // Add the first column, even if empty (to ensure table structure is correct)
  columns.push(firstCol || document.createTextNode(''));

  if (main) {
    const items = main.querySelectorAll('.container__item.container__main__element');
    items.forEach((item) => {
      // Get all .text.parbase blocks inside this item (sometimes there can be more than one)
      const parbases = item.querySelectorAll('.text.parbase');
      if (parbases.length === 1) {
        columns.push(parbases[0]);
      } else if (parbases.length > 1) {
        columns.push(Array.from(parbases));
      } else {
        // fallback: push all content in the item
        columns.push(extractAllContent(item));
      }
    });
  }

  // Build cells array
  const cells = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
