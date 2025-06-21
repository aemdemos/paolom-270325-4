/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content container
  const main = element.querySelector('.container__items.container__main');
  if (!main) return;

  // Get all top-level columns
  const columns = Array.from(main.querySelectorAll(':scope > .container__item'));
  if (!columns.length) return;

  // Check if first column is just a section header (contains only a heading)
  let headerCol = null;
  let dataCols = columns;
  const firstCol = columns[0];
  // Check for a heading (h2, h1, h3) as the only meaningful element
  if (
    firstCol.children.length === 1 &&
    firstCol.querySelector('.text.parbase') &&
    firstCol.querySelector('.text.parbase').querySelector('h1, h2, h3')
  ) {
    headerCol = firstCol;
    dataCols = columns.slice(1);
  }

  // Helper: Get all relevant child nodes (skip empty paragraphs)
  function extractContentNodes(node) {
    const nodes = [];
    // Only consider '.text.parbase' direct children
    node.querySelectorAll(':scope > .text.parbase').forEach(txt => {
      Array.from(txt.childNodes).forEach(child => {
        // Skip empty paragraphs unless they contain img or a
        if (
          child.nodeType === Node.ELEMENT_NODE &&
          child.tagName === 'P' &&
          !child.textContent.trim() &&
          !child.querySelector('img') &&
          !child.querySelector('a')
        ) {
          return;
        }
        // Skip empty text nodes
        if (child.nodeType === Node.TEXT_NODE && !child.textContent.trim()) return;
        nodes.push(child);
      });
    });
    return nodes;
  }

  // Build header row
  const headerRow = ['Columns (columns8)'];

  // Build main content columns (one array per column)
  const contentRow = dataCols.map(col => extractContentNodes(col));

  // If headerCol is present, create a row for it; otherwise, just the content row
  let tableRows;
  if (headerCol) {
    // Make an array for the header col, pad with empty arrays for other columns
    const headerParts = extractContentNodes(headerCol);
    const headerRowCells = [headerParts, ...Array(contentRow.length - 1).fill([])];
    tableRows = [headerRow, headerRowCells, contentRow];
  } else {
    tableRows = [headerRow, contentRow];
  }

  // Use createTable
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
