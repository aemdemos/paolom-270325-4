/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches block name and variant
  const headerRow = ['Columns (columns178)'];

  // Find the heading (the h2)
  const heading = element.querySelector('h2');

  // Find the image, referencing the actual <img> tag
  const image = element.querySelector('.image img');

  // Find the text content (the .text block with multiple <p> and <span> inside)
  const textBlock = element.querySelector('.text');

  // Build the left column: the image
  let leftCell = null;
  if (image) {
    leftCell = image;
  }

  // Build the right column: heading + text block (preserving structure and semantics)
  let rightCell = document.createDocumentFragment();
  if (heading) rightCell.appendChild(heading);
  if (textBlock) rightCell.appendChild(textBlock);

  // If both columns exist, use two columns. If only one, use a single column.
  let columnsRow;
  if (leftCell && rightCell.childNodes.length) {
    columnsRow = [leftCell, rightCell];
  } else if (rightCell.childNodes.length) {
    columnsRow = [rightCell];
  } else if (leftCell) {
    columnsRow = [leftCell];
  } else {
    columnsRow = [];
  }

  // Compose the table
  const cells = [
    headerRow,
    columnsRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
