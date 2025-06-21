/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find background image (if any) from .focuspoint
  let bgUrl = null;
  const focuspoint = element.querySelector('.focuspoint');
  if (focuspoint && focuspoint.style.backgroundImage) {
    const bgImage = focuspoint.style.backgroundImage;
    // Look for a url() in backgroundImage CSS
    const match = bgImage.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) {
      bgUrl = match[1];
    }
  }

  // 2. Image cell: insert <img> if found, otherwise empty string
  let imageCell = '';
  if (bgUrl) {
    const img = document.createElement('img');
    img.src = bgUrl;
    imageCell = img;
  }

  // 3. Collect all visible content in the 'content' cell (headings, paragraphs, etc.)
  // Use .hero__main .text if available, otherwise .hero__main, otherwise element
  let contentRoot = element.querySelector('.hero__main .text')
    || element.querySelector('.hero__main')
    || element;

  // We'll gather all direct children that are block-level (headings, paragraphs, lists, etc.)
  // but ignore empty <p>&nbsp;</p> and whitespace nodes
  const children = Array.from(contentRoot.children)
    .filter(el => {
      // Ignore empty elements (including &nbsp;)
      return el.textContent && el.textContent.replace(/\u00a0|\s/g, '').length > 0;
    });
  
  let heroContent = '';
  if (children.length > 0) {
    heroContent = children;
  }

  // 4. Build the table: 1 column, 3 rows; header is exactly 'Hero'.
  const cells = [
    ['Hero'],
    [imageCell],
    [heroContent],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
