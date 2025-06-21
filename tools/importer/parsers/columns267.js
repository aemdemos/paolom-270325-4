/* global WebImporter */
export default function parse(element, { document }) {
  // Get all visible direct child divs
  const visibleDivs = Array.from(element.querySelectorAll(':scope > div'))
    .filter(div => {
      const style = div.getAttribute('style') || '';
      return !/display:\s*none/.test(style);
    });

  if (!visibleDivs.length) return;

  // Helper to extract all meaningful content from each block
  function getAllContent(div) {
    // Remove screen-reader/back links
    return Array.from(div.childNodes).filter(node => {
      if (node.nodeType === 1) {
        // element
        if (node.matches('a.screen-reader-only, a.back-to-origin')) return false;
        return true;
      } else if (node.nodeType === 3) {
        // text nodes: preserve only if not whitespace
        return node.textContent.trim().length > 0;
      }
      return false;
    });
  }

  // Decide number of columns per row: try to keep as even as possible, but at least 2 columns
  // For the given example, it's all in one row, so put all visibleDivs in a single row
  const columnsRow = visibleDivs.map(getAllContent).map(children => {
    // If only one element, use the element, if multiple, pass as array
    if (children.length === 1) return children[0];
    if (children.length > 1) return children;
    return '';
  });

  // Build the cells array
  // First row: header (must be single cell)
  // Second row: all columns as separate cells
  const cells = [
    ['Columns (columns267)'],
    columnsRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
