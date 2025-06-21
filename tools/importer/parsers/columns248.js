/* global WebImporter */
export default function parse(element, { document }) {
  // Table header from the block info
  const headerRow = ['Columns (columns248)'];

  // The main grid containing the columns
  const grid = element.querySelector('.hero__grid.hero__grid--topic');
  if (!grid) return;
  const leftCol = grid.querySelector('.hero__columnContent');
  const rightCol = grid.querySelector('.hero__columnImage');

  // Left content: keep the container div with all its content
  let leftContent = leftCol || '';

  // Right content: extract background-image url and create image element
  let rightContent = '';
  if (rightCol) {
    const bgDiv = rightCol.querySelector('.hero__image');
    if (bgDiv && bgDiv.style.backgroundImage) {
      const urlMatch = bgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = '';
        rightContent = img;
      }
    }
  }

  // Build the block table
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
