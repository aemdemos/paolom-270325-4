/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main columns container
  const mainContainer = element.querySelector('.container__items');
  if (!mainContainer) return;

  // Find all columns (each .container__item)
  const items = Array.from(mainContainer.querySelectorAll(':scope > .container__item'));
  if (items.length === 0) return;

  // Each column: reference the .text.parbase block (contains all content)
  const columns = items.map((item) => {
    const content = item.querySelector('.text.parbase');
    // If no content, fallback to the item itself
    return content || item;
  });

  // Build table: first row header, second row columns (one cell per column)
  const rows = [];
  rows.push(['Columns (columns141)']);
  rows.push(columns);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}