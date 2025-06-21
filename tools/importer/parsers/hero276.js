/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match exactly: 'Hero'
  // 2. Second row: background image (none in this html)
  // 3. Third row: All heading and text content -- preserve elements

  // Find the main text content container (should work for variations)
  let contentElements = [];
  // Try to find the primary text block (may be nested)
  let textBlock = element.querySelector('.text');
  if (textBlock) {
    // All children (headings, paragraphs, etc), filter out empty nodes
    contentElements = Array.from(textBlock.children).filter(e => e.textContent.trim().length > 0);
  } else {
    // Fallback: get all h1-h6, p inside the element in order
    contentElements = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6, p')).filter(e => e.textContent.trim().length > 0);
  }

  // If nothing found, make sure to pass an empty string for that cell
  const cells = [
    ['Hero'],
    [''],
    [contentElements.length ? contentElements : ['']],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
