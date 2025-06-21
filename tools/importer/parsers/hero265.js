/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: must match exactly, 1 column, 1 row
  const headerRow = ['Hero'];

  // 2. Background image (optional): check for background-image in .focuspoint
  let backgroundImgEl = null;
  const focuspoint = element.querySelector('.focuspoint');
  if (focuspoint && focuspoint.style && focuspoint.style.backgroundImage) {
    const bgImg = focuspoint.style.backgroundImage;
    // extract url() from style string
    const match = bgImg.match(/url\(["']?([^"')]+)["']?\)/);
    if (match && match[1]) {
      backgroundImgEl = document.createElement('img');
      backgroundImgEl.src = match[1];
      backgroundImgEl.alt = '';
    }
  }

  // 3. Text content (title, subheading, etc): get all content from .hero__main
  const heroMain = element.querySelector('.hero__main');
  let contentArr = [];
  if (heroMain) {
    // Get all direct children (may include div.text, headings, paragraphs, etc.)
    [...heroMain.childNodes].forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        contentArr.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        // Wrap any meaningful text node in a span so it's not lost
        const span = document.createElement('span');
        span.textContent = node.textContent;
        contentArr.push(span);
      }
    });
    // If only 1 element and it's a wrapper (like div.text), flatten its children (they are headings/paragraphs)
    if (contentArr.length === 1 && contentArr[0].children && contentArr[0].children.length > 0) {
      const onlyEl = contentArr[0];
      contentArr = [...onlyEl.children];
    }
  }
  // Fallback to blank if not found
  const textRow = [contentArr.length ? contentArr : ''];

  // Compose and insert table
  const cells = [
    headerRow,
    [backgroundImgEl ? backgroundImgEl : ''],
    textRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
