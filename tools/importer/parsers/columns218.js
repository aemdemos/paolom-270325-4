/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column containers
  const containers = element.querySelectorAll(':scope > .container__items');
  if (containers.length < 2) return;

  // === COLUMN 1 ===
  const mainCol = containers[0];
  // Heading: prefer h2 in .text.parbase
  const heading = mainCol.querySelector('.text.parbase h2');
  // Image: prefer first .image img in the column
  const imgDiv = mainCol.querySelector('.image');
  const img = imgDiv ? imgDiv.querySelector('img') : null;

  // Compose first column array
  const col1 = [];
  if (heading) col1.push(heading);
  if (img) {
    // Add a <br> if both heading and image exist
    if (heading) col1.push(document.createElement('br'));
    col1.push(img);
  }

  // === COLUMN 2 ===
  const asideCol = containers[1];
  // Get the .text.parbase content as the second column
  const asideText = asideCol.querySelector('.text.parbase');
  let col2 = [];
  if (asideText) {
    // Filter out empty paragraphs unless they contain images
    col2 = Array.from(asideText.childNodes).filter(node => {
      if (node.nodeType === 1) {
        if (node.tagName === 'P' && node.textContent.trim() === '' && !node.querySelector('img')) return false;
        return true;
      }
      return false;
    });
  }

  // Build table as per block spec
  const headerRow = ['Columns (columns218)'];
  const tableRows = [headerRow, [col1, col2]];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
