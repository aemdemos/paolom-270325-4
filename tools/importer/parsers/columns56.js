/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be exactly one cell with the correct label
  const headerRow = ['Columns (columns56)'];

  // Find main 'grid' structure, fallback to element if not found
  let grid = element.querySelector('.grid');
  if (!grid) grid = element;

  // Find all columns (should be .container__items)
  let colNodes = Array.from(grid.querySelectorAll(':scope > .clearfix > .container__items'));
  if (colNodes.length === 0) {
    colNodes = Array.from(grid.querySelectorAll('.container__items'));
  }

  // For each column, gather all component children with content
  function extractColumnContent(colNode) {
    const components = Array.from(colNode.querySelectorAll(':scope > .aem__component'));
    let content = [];
    if (components.length > 0) {
      components.forEach(comp => {
        // Each .aem__component may have one or more content nodes
        const subComps = Array.from(comp.children).filter(
          c => c.childElementCount > 0 || c.textContent.trim().length > 0
        );
        if (subComps.length > 0) {
          content.push(...subComps);
        } else if (comp.textContent.trim().length > 0) {
          content.push(comp);
        }
      });
    }
    if (content.length === 0) {
      // fallback to all children with content or the node itself
      const fallback = Array.from(colNode.children).filter(
        c => c.childElementCount > 0 || c.textContent.trim().length > 0
      );
      if (fallback.length > 0) content.push(...fallback);
      else content.push(colNode);
    }
    return content;
  }

  const columns = colNodes.map(extractColumnContent);

  // Compose the table, header is a single cell, content is one row with as many columns as needed
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);
  element.replaceWith(table);
}
