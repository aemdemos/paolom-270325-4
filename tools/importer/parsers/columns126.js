/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Single column with block name
  const headerRow = ['Columns (columns126)'];

  // Get all columns (immediate children with .container__item)
  const columns = Array.from(element.querySelectorAll(':scope .container__item'));

  // For each column, extract the main content block (reference existing element)
  const cellElements = columns.map(col => {
    const innerDiv = col.querySelector(':scope > div');
    if (innerDiv) {
      const textDiv = innerDiv.querySelector('.text.parbase');
      if (textDiv) return textDiv;
      return innerDiv;
    }
    return col;
  });

  // Compose the cells array: header row (single cell), then content row (one cell per column)
  const cells = [
    headerRow,         // Single cell header row
    cellElements       // N cells (columns), in one row
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
