/* global WebImporter */
export default function parse(element, { document }) {
  // Get the left column (content)
  let leftCol = null;
  const contentContainer = element.querySelector('.hero__content--container');
  if (contentContainer) {
    leftCol = contentContainer.querySelector('.hero__columnContent');
  }
  // Get the right column (image)
  let rightCol = null;
  if (contentContainer) {
    const imageDiv = contentContainer.querySelector('.hero__columnImage .hero__image');
    if (imageDiv) {
      const bg = imageDiv.style.backgroundImage;
      const urlMatch = bg.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = '';
        rightCol = img;
      }
    }
  }
  if (!leftCol) leftCol = document.createElement('div');
  if (!rightCol) rightCol = document.createElement('div');

  // The header row should be a single cell, one column, as in the markdown example
  // The second row should have as many columns as needed (here, two)
  // This is already correct: header row is [ 'Columns (columns81)' ]
  const cells = [
    ['Columns (columns81)'],
    [leftCol, rightCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}