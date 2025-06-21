/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns: direct children with class 'container__item'
  const itemSelector = ':scope > .container__items > .container__main > .aem__component > .container__item';
  const columns = Array.from(element.querySelectorAll(itemSelector));
  if (!columns.length) return;

  // For each column, collect all direct child elements that have content
  const columnCells = columns.map((col) => {
    // Only direct children (e.g., text parbase, textimage parbase)
    const blocks = Array.from(col.children).filter((child) => !!child.innerHTML.trim());

    // If there's more than one block, put them in array (to preserve order/content)
    // If only one, use directly
    if (blocks.length === 1) return blocks[0];
    if (blocks.length > 1) return blocks;
    // If empty, just return an empty string (should not happen for valid columns)
    return '';
  });

  // Construct the table rows: header row, then one row for all columns
  const headerRow = ['Columns (columns127)'];
  const tableData = [headerRow, columnCells];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}