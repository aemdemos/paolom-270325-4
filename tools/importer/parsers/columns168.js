/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area holding the columns
  const main = element.querySelector('.container__items');
  if (!main) return;

  // Get all direct child column elements
  const columnItems = Array.from(main.children).filter(child => child.classList.contains('container__item'));
  if (columnItems.length === 0) return;

  // Table header row: match block name from requirement and example exactly
  const headerRow = ['Columns (columns168)'];

  // Table columns row: each immediate column's content referenced directly
  // For best resilience, reference the content div inside, or fallback to the item itself
  const columnsRow = columnItems.map(item => {
    // Normally the .text.parbase holds content, but fallback to item for safety
    const content = item.querySelector('.text.parbase') || item;
    return content;
  });

  // Compose table data
  const tableRows = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element in the DOM with the new table
  element.replaceWith(block);
}
