/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area that holds image and text
  const mainColumn = element.querySelector('.container__main__element');
  let imageEl = null;
  let contentEls = [];

  if (mainColumn) {
    // Find the image (referenced directly)
    const imageContainer = mainColumn.querySelector('.image-text .image');
    if (imageContainer) {
      const img = imageContainer.querySelector('img[alt]');
      if (img) imageEl = img;
    }
    // Find the text content (all direct children)
    const textContainer = mainColumn.querySelector('.image-text .text');
    if (textContainer) {
      // Keep all content, including headings, paragraphs, links, small print etc.
      contentEls = Array.from(textContainer.childNodes).filter((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) return true;
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
        return false;
      });
    }
  }

  // Build the block table with the specified header and correct structure
  const cells = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [contentEls.length ? contentEls : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
