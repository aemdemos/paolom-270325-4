/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level columns in this block
  const columns = Array.from(element.querySelectorAll(':scope > .container__items > .container__main > .aem__component > .container__item.container__main__element'));

  // Defensive: fallback if structure changes slightly (e.g., missing .aem__component)
  let realColumns = columns;
  if (columns.length === 0) {
    // Try one level up
    const altColumns = Array.from(element.querySelectorAll(':scope .container__item.container__main__element'));
    if (altColumns.length) {
      realColumns = altColumns;
    }
  }

  // For each column, extract its main content (the .text inside)
  const cells = realColumns.map(col => {
    // Use all children of .text, not just the .text div itself
    const text = col.querySelector(':scope > .text');
    if (text) {
      // If there's only one child, return it directly. Otherwise, return an array of all children.
      const children = Array.from(text.childNodes).filter(node => {
        // Exclude empty text nodes
        return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
      });
      if (children.length === 1) {
        return children[0];
      } else if (children.length > 1) {
        return children;
      } else {
        // empty div, just in case
        return '';
      }
    }
    return '';
  });

  // Table header row, exactly as required
  const headerRow = ['Columns (columns238)'];
  const tableRows = [headerRow, cells];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
