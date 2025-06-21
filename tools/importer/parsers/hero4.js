/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create header row exactly as in the example
  const headerRow = ['Hero'];

  // 2. Extract background image from .hero__image style
  let bgImgUrl = '';
  const imgDiv = element.querySelector('.hero__columnImage .hero__image');
  if (imgDiv && imgDiv.style && imgDiv.style.backgroundImage) {
    const match = imgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) {
      bgImgUrl = match[1];
      // Make absolute if needed
      if (bgImgUrl.startsWith('/')) {
        const a = document.createElement('a');
        a.href = bgImgUrl;
        bgImgUrl = a.href;
      }
    }
  }
  let imageElem = '';
  if (bgImgUrl) {
    imageElem = document.createElement('img');
    imageElem.src = bgImgUrl;
    imageElem.alt = '';
  }

  // 3. Extract text content (heading, paragraphs, lists, etc.)
  const contentCol = element.querySelector('.hero__columnContent');
  let contentElems = [];
  if (contentCol) {
    const contentRow = contentCol.querySelector('.hero__contentRow');
    if (contentRow) {
      // Collect all direct children in order: heading, p, ul, etc.
      const children = Array.from(contentRow.children);
      contentElems = children;
    }
  }

  // 4. Build output table rows: header, image (may be empty), content
  const rows = [
    headerRow,
    [imageElem || ''],
    [contentElems.length ? contentElems : '']
  ];

  // 5. Create and insert block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
