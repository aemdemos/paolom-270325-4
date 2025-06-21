/* global WebImporter */
export default function parse(element, { document }) {
  // Get the left (content) and right (image) columns
  let leftCol, rightCol;

  // LEFT COLUMN (content)
  const contentContainer = element.querySelector('.hero__content--container');
  if (contentContainer) {
    const contentDiv = contentContainer.querySelector('.hero__columnContent');
    leftCol = contentDiv || contentContainer;
  } else {
    leftCol = '';
  }

  // RIGHT COLUMN (image)
  const imageContainer = element.querySelector('.hero__columnImage');
  if (imageContainer) {
    const bgDiv = imageContainer.querySelector('.hero__image');
    if (bgDiv && bgDiv.style.backgroundImage) {
      const urlMatch = bgDiv.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = '';
        rightCol = img;
      } else {
        rightCol = '';
      }
    } else {
      rightCol = '';
    }
  } else {
    rightCol = '';
  }

  // Compose the table
  // Header row must have exactly one cell, matching the number of columns (colspan handled by downstream)
  const columns = [leftCol, rightCol];
  const cells = [
    ['Columns (columns89)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
