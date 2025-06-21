/* global WebImporter */
export default function parse(element, { document }) {
  // Header row should be exactly one cell (1 column), as per example
  const headerRow = ['Cards (cards208)'];

  // Find disclaimer text and back link
  const disclaimerText = element.querySelector('p');
  const backLink = element.querySelector('a');

  // Compose card content (text cell)
  const cardContent = [];
  if (disclaimerText) cardContent.push(disclaimerText);
  if (backLink) cardContent.push(document.createElement('br'), backLink);

  // Create the cells array: header is 1 col, content row is 2 cols (image|icon, text)
  const cells = [
    headerRow,                // one column
    ['', cardContent]         // two columns: image/icon (empty), text content
  ];

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
