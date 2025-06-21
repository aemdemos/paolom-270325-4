/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row exactly as in the example
  const headerRow = ['Hero'];

  // 2. Image row: Extract background image from inline style if present
  let imageCell = '';
  const imageDiv = element.querySelector('.hero__columnImage .hero__image');
  if (imageDiv && imageDiv.style && imageDiv.style.backgroundImage) {
    const urlMatch = imageDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/i);
    if (urlMatch && urlMatch[1]) {
      const img = document.createElement('img');
      img.src = urlMatch[1];
      imageCell = img;
    }
  }

  // 3. Content cell: Extract heading and all text elements in order from the text/content column
  let contentCell = '';
  // Try both possible containers for robustness
  let contentContainer = element.querySelector('.hero__columnContent--withImage') || element.querySelector('.hero__content--container');
  if (contentContainer) {
    // Collect h1, h2, h3, paragraphs, and links/buttons in order
    const contentNodes = [];
    // All direct children to preserve order and formatting
    contentContainer.childNodes.forEach((node) => {
      // Only keep elements, skip text nodes that are just whitespace
      if (node.nodeType === Node.ELEMENT_NODE) {
        contentNodes.push(node);
      }
    });
    // If nothing found, fallback to all content
    if (contentNodes.length > 0) {
      contentCell = contentNodes;
    } else {
      contentCell = contentContainer;
    }
  }

  const tableRows = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
