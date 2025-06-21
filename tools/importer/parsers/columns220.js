/* global WebImporter */
export default function parse(element, { document }) {
  // Find main and aside columns
  const mainCol = element.querySelector('.container__main');
  const asideCol = element.querySelector('.container__aside');

  // --- First column: Heading and illustration ---
  const col1Content = [];
  if (mainCol) {
    // Heading
    const heading = mainCol.querySelector('.text h2');
    if (heading) col1Content.push(heading);
    // Image (keep the <img> element)
    const img = mainCol.querySelector('.image img');
    if (img) col1Content.push(img);
  }

  // --- Second column: All business content ---
  const col2Content = [];
  if (asideCol) {
    // We want to preserve structure: paragraphs, headings, images, links
    // Get the main content container
    const asideText = asideCol.querySelector('.text.parbase');
    if (asideText) {
      // Collect all child elements (preserve order)
      asideText.childNodes.forEach(node => {
        // Ignore completely empty <p> or whitespace-only text nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'P' && node.textContent.trim() === '' && !node.querySelector('img')) {
            // skip empty <p> unless it contains an image
            return;
          } else {
            col2Content.push(node);
          }
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
          col2Content.push(document.createTextNode(node.textContent));
        }
      });
    }
  }

  // --- Compose block table ---
  const headerRow = ['Columns (columns220)'];
  const contentRow = [col1Content, col2Content];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
