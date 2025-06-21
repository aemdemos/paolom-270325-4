/* global WebImporter */
export default function parse(element, { document }) {
  // Extract left column (main content)
  const leftCol = element.querySelector('.hero__content--container');

  // Extract right column (background image as <img>)
  let rightColContent = '';
  const rightCol = element.querySelector('.hero__columnImage');
  if (rightCol) {
    const bgDiv = rightCol.querySelector('.hero__image');
    if (bgDiv) {
      const style = bgDiv.getAttribute('style') || '';
      const urlMatch = style.match(/url\(([^)]+)\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1].replace(/['"]/g, '').trim();
        img.setAttribute('loading', 'lazy');
        rightColContent = img;
      }
    }
  }

  // Table header row should be a single cell
  const headerRow = ['Columns (columns64)'];
  // Content row: two columns
  const contentRow = [leftCol, rightColContent];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
