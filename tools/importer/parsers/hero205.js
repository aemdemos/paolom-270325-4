/* global WebImporter */
export default function parse(element, { document }) {
  // The hero block expects 1 column, 3 rows: header, image (optional), content (heading/cta)

  // 1. Find the main grid inside the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // 2. Left side: image (optional)
  // First try to find an img inside the whole left/main area
  let imageEl = null;
  const mainColumn = grid.querySelector('.container__main .container__item');
  if (mainColumn) {
    const img = mainColumn.querySelector('img');
    if (img && img.src) imageEl = img;
  } else {
    // fallback: search any image in grid
    const img = grid.querySelector('img');
    if (img && img.src) imageEl = img;
  }

  // 3. Right side: content (heading, subheading, cta)
  // Look for .container__aside .container__item .text
  let contentNodes = [];
  const asideItem = grid.querySelector('.container__aside .container__item');
  if (asideItem) {
    const text = asideItem.querySelector('.text');
    if (text) {
      // Only keep non-empty child nodes (headings, p, a, etc)
      contentNodes = Array.from(text.childNodes).filter(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // skip empty divs
          return !(node.tagName === 'DIV' && node.textContent.trim() === '');
        } else if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim() !== '';
        }
        return false;
      });
    }
  }

  // Compose table rows as per Hero block description
  const rows = [];
  // Header row
  rows.push(['Hero']);
  // Image row (may be empty)
  rows.push([imageEl ? imageEl : '']);
  // Content row (may be empty)
  rows.push([contentNodes.length > 0 ? contentNodes : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
