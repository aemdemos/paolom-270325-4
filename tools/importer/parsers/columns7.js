/* global WebImporter */
export default function parse(element, { document }) {
  // Header: Single-cell header row as per example
  const headerRow = ['Columns (columns7)'];

  // Main content (left column)
  const mainContent = element.querySelector('.cmp-contentfragment__element-value');
  const leftCell = mainContent ? mainContent : '';

  // Right column: Article image if available
  let rightCell = '';
  const updateField = element.querySelector('.article-hub-container__update-field');
  if (updateField) {
    const imgPathDiv = updateField.querySelector('.article-hub-container__update-image-path');
    if (imgPathDiv && imgPathDiv.textContent.trim()) {
      const img = document.createElement('img');
      img.src = imgPathDiv.textContent.trim();
      img.alt = '';
      rightCell = img;
    }
  }

  // Second row: two columns for content
  const contentRow = [leftCell, rightCell];

  // Build final table structure: header is a single cell, followed by a row with two columns
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
