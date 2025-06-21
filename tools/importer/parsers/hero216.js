/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the first image in block (for the Hero image)
  let imgEl = element.querySelector('img');

  // Helper: find the main text container in the Hero block
  let textRoot = element.querySelector('.container__main__element') ||
    element.querySelector('.container__items') ||
    element.querySelector('.text.parbase') ||
    element;

  // Extract all heading and paragraph elements in order (ignore empty ones)
  let blockEls = [];
  const allBlockEls = Array.from(textRoot.querySelectorAll('h1, h2, h3, h4, h5, h6, p'));
  for (const el of allBlockEls) {
    // Only include non-empty headings/paragraphs
    if (el.textContent.trim().replace(/\u00A0/g, '').length > 0) {
      blockEls.push(el);
    }
  }

  // Table per example structure: 1 col, 3 rows (header, image, text)
  // The header row must be exactly 'Hero'.
  // The image row is only the image element (or empty string if missing).
  // The third row is all heading and paragraph blocks in order, or empty string if none.
  const cells = [
    ['Hero'],
    [imgEl || ''],
    [blockEls.length ? blockEls : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
