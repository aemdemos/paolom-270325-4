/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must be a single cell/column with exact text
  const headerRow = ['Columns (columns46)'];

  // Left column: all content in .hero__columnContent (preserve DOM)
  const leftCol = element.querySelector('.hero__columnContent');
  let leftContent = [];
  if (leftCol) {
    // Gather all direct children of .hero__columnContent
    leftContent = Array.from(leftCol.children);
  }

  // Right column: .hero__image with background-image style
  let rightContent = '';
  const imageEl = element.querySelector('.hero__columnImage .hero__image');
  if (imageEl) {
    const style = imageEl.getAttribute('style') || '';
    const match = style.match(/background-image: *url\((['"]?)([^'")]+)\1\)/i);
    if (match) {
      const img = document.createElement('img');
      img.src = match[2];
      img.alt = '';
      rightContent = img;
    }
  }

  // Compose the table rows: header is single column, content row two columns
  const cells = [
    headerRow, // one cell only for header row
    [leftContent, rightContent] // two cells for content row
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
