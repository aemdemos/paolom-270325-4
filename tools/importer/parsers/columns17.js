/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image element from an inline background-image style
  function extractImageFromBg(div) {
    const style = div.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/i);
    if (match) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = '';
      return img;
    }
    return null;
  }

  // Extract left and right columns
  const container = element.querySelector('.hero__content--container');
  if (!container) return;
  const contentCol = container.querySelector('.hero__columnContent');
  const imageCol = container.querySelector('.hero__columnImage');

  // Prepare left cell content: reference the hero__contentRow directly
  let leftCell = '';
  if (contentCol) {
    const row = contentCol.querySelector('.hero__contentRow');
    if (row) leftCell = row;
  }

  // Prepare right cell content: try to get the image if available
  let rightCell = '';
  if (imageCol) {
    const imageDiv = imageCol.querySelector('.hero__image');
    if (imageDiv) {
      const img = extractImageFromBg(imageDiv);
      if (img) rightCell = img;
    }
  }

  // Compose the cells array: header row should have exactly one cell
  const cells = [
    ['Columns (columns17)'], // header row: one cell only
    [leftCell, rightCell]    // content row: two cells/columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
