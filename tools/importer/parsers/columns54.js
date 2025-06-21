/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per the exact required string
  const headerRow = ['Columns (columns54)'];

  // Find the top-level content container
  const container = element.querySelector('.hero__content--container');

  // Defensive: If structure does not match, abort
  if (!container) return;

  // Get the first content column (text/buttons)
  const firstCol = container.querySelector('.hero__columnContent');

  // Get the image column
  const secondCol = container.querySelector('.hero__columnImage');

  // Defensive: If not both columns, do not proceed
  if (!firstCol && !secondCol) return;

  // For image column: if image exists, convert background-image to <img>, otherwise use as is
  let imageCell = null;
  if (secondCol) {
    const bgDiv = secondCol.querySelector('.hero__image');
    if (bgDiv) {
      const bgStyle = bgDiv.getAttribute('style') || '';
      const match = bgStyle.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
      if (match && match[1]) {
        const img = document.createElement('img');
        img.src = match[1];
        img.alt = '';
        imageCell = img;
      }
    }
  }

  // If no image found, leave cell empty

  // Compose columns row, always two columns for this block
  const columnsRow = [firstCol, imageCell];

  // Build the table as required
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
