/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main banner article containing the columns contents
  const banner = element.querySelector('.article-hub__banner-article');
  if (!banner) return;

  // The .grid container holds both nav and main content
  const grid = banner.querySelector('.grid');
  if (!grid) return;

  // LEFT COLUMN: all text content and nav links
  const leftCol = document.createElement('div');

  // Compose all main text from .article-hub__banner-main-text
  const main = grid.querySelector('.article-hub__banner-main');
  if (main) {
    const mainText = main.querySelector('.article-hub__banner-main-text');
    if (mainText) {
      Array.from(mainText.childNodes).forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const style = node.getAttribute('style');
          if (!style || !/display\s*:\s*none/.test(style)) {
            leftCol.appendChild(node);
          }
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          leftCol.appendChild(document.createTextNode(node.textContent));
        }
      });
    }
  }

  // Add nav links if present
  const nav = grid.querySelector('.article-hub__banner-second-nav .extra');
  if (nav) {
    leftCol.appendChild(nav);
  }

  // RIGHT COLUMN: main image if present
  let rightCol = '';
  if (main) {
    const imgDiv = main.querySelector('.article-hub__banner-main-img');
    if (imgDiv && imgDiv.style.backgroundImage) {
      const bg = imgDiv.style.backgroundImage;
      const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
      if (match && match[1]) {
        const img = document.createElement('img');
        img.src = match[1];
        img.setAttribute('loading', 'lazy');
        rightCol = img;
      }
    }
  }

  // Compose table rows. Header must match exactly, single cell in header row.
  const cells = [
    ['Columns (columns1)'],
    [leftCol, rightCol]
  ];

  // Create and replace with new table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
