/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row must be exactly 'Hero'
  const headerRow = ['Hero'];

  // 2. Background image extraction: use <img> for background-image if present
  let bgImgEl = '';
  const imgDiv = element.querySelector('.hero__columnImage .hero__image');
  if (imgDiv) {
    const style = imgDiv.getAttribute('style') || '';
    // Extract the URL from style="background-image: url(...)"
    const match = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/);
    if (match && match[1]) {
      bgImgEl = document.createElement('img');
      bgImgEl.src = match[1];
    }
  }

  // 3. Extract the right content column
  const contentCol = element.querySelector('.hero__columnContent');
  const contentArr = [];
  if (contentCol) {
    const contentRow = contentCol.querySelector('.hero__contentRow');
    if (contentRow) {
      // Grab ALL child nodes in order (preserves structure and formatting)
      contentRow.childNodes.forEach((node) => {
        // Ignore empty <p> (with just &nbsp;)
        if (node.nodeType === 1 && node.tagName === 'P' && node.textContent.replace(/\u00a0/g, '').trim() === '') {
          return;
        }
        // Otherwise, keep as-is (refers to element, not a clone)
        contentArr.push(node);
      });
    }
  }

  // 4. Build the table as per the markdown example (1 column, 3 rows)
  const cells = [
    headerRow,
    [bgImgEl ? bgImgEl : ''],
    [contentArr]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
