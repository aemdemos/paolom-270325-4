/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct child column elements
  const main = element.querySelector('.container__items.container__main');
  if (!main) return;
  const columns = Array.from(main.querySelectorAll(':scope > .container__item'));

  // Defensive: If no columns, do nothing
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns (columns176)'];

  // Build the content row: each column's main content as a cell
  // For each column, we want the inner content (usually a div.text.parbase)
  const contentRow = columns.map(col => {
    // Grab the first .text.parbase child or fallback to the column itself
    const content = col.querySelector('.text.parbase');
    if (content) {
      // If .text.parbase is found, but empty, return an empty string
      // If it has children, reference the div itself
      if (content.children.length === 0 && content.textContent.trim() === '') {
        return '';
      }
      return content;
    }
    // Fallback: if column is empty, return empty string, else the column itself
    if (col.children.length === 0 && col.textContent.trim() === '') {
      return '';
    }
    return col;
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
