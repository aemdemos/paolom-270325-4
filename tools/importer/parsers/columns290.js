/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid inside the .columns block
  const grid = element.querySelector('.grid');
  if (!grid) return;

  const containerItems = grid.querySelector('.container__items');
  if (!containerItems) return;

  const aemComponent = containerItems.querySelector('.aem__component');
  if (!aemComponent) return;

  // All immediate .container__item children under .aem__component
  const items = Array.from(aemComponent.querySelectorAll(':scope > .container__item'));

  // Only columns with content (ignore empty placeholders)
  const contentColumns = items.filter(item => {
    return item.textContent.trim().length > 0 || item.children.length > 0;
  });

  // Each column cell: use the direct content inside each .container__item
  // If a .text.parbase exists, use that as the cell, otherwise use the item itself
  const dataRow = contentColumns.map(item => {
    const textParbase = item.querySelector(':scope > .text.parbase');
    if (textParbase) {
      return textParbase;
    }
    return item;
  });

  // The header row must be a single cell (single column)
  const tableData = [
    ['Columns (columns290)'],
    dataRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
