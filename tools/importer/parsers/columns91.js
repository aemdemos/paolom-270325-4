/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid area inside the hero section
  const grid = element.querySelector('.hero__grid.hero__grid--topic');
  if (!grid) return;

  // Get the two primary column containers
  let col1 = null;
  let col2 = null;

  // First column: content
  const contentCol = grid.querySelector('.hero__content--container .hero__columnContent--topic');
  if (contentCol) col1 = contentCol;

  // Second column: image
  const imageContainer = grid.querySelector('.hero__columnImage');
  if (imageContainer) {
    const heroImageDiv = imageContainer.querySelector('.hero__image--topic');
    if (heroImageDiv && heroImageDiv.style.backgroundImage) {
      const urlMatch = heroImageDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = '';
        col2 = img;
      }
    }
  }

  // Only include cells if they exist
  const rowCells = [];
  if (col1) rowCells.push(col1);
  if (col2) rowCells.push(col2);
  if (!rowCells.length) return;

  // Compose the table rows
  // Header row: exactly one cell, as per example
  const headerRow = ['Columns (columns91)'];
  const cells = [headerRow, rowCells];

  // Create the block and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
