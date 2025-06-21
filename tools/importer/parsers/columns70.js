/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract the image from an element with background-image style
  function extractBgImage(el) {
    if (!el) return null;
    const style = el.getAttribute('style') || '';
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = '';
      img.style.width = '100%';
      return img;
    }
    return null;
  }

  // Get the main left and right blocks
  const leftCol = element.querySelector('.hero__columnContent');
  const rightCol = element.querySelector('.hero__columnImage');

  // Build the left column: use all direct children of .hero__contentRow (which is inside .hero__columnContent)
  let leftContent = document.createElement('div');
  if (leftCol) {
    const contentRow = leftCol.querySelector('.hero__contentRow') || leftCol;
    Array.from(contentRow.children).forEach(child => {
      leftContent.appendChild(child);
    });
  }

  // Build the right column: add image from background-image style
  let rightContent = document.createElement('div');
  if (rightCol) {
    const imgDiv = rightCol.querySelector('.hero__image');
    const img = extractBgImage(imgDiv);
    if (img) {
      rightContent.appendChild(img);
    }
  }

  // Fix: header row must be a single cell array
  const cells = [
    ['Columns (columns70)'], // Header row: ONLY ONE CELL
    [leftContent, rightContent] // Second row: two columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
