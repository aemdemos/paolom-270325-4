/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const container = element.querySelector('.container__items.container__main');
  if (!container) return;

  // Find all child columns (ignore visually/structurally empty columns)
  const columnEls = Array.from(container.querySelectorAll(':scope > .container__item.container__main__element'));

  // Only include columns that have meaningful content (at least one child with visible markup or text)
  const columns = columnEls.map(col => {
    // Support structure: sometimes .text.parbase is the only child
    // Find only children with content (text or element nodes)
    const contentNodes = Array.from(col.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return node.textContent.trim() !== '' || node.querySelector('img,svg,video,iframe');
      } else if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim() !== '';
      }
      return false;
    });
    // If there's only one content node, just return it; otherwise, return array
    if (contentNodes.length === 1) return contentNodes[0];
    if (contentNodes.length > 1) return contentNodes;
    return null;
  }).filter(Boolean);

  if (columns.length === 0) return;

  // Build the table rows
  const rows = [];
  rows.push(['Columns (columns180)']);
  rows.push(columns);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
