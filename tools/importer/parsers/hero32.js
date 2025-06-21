/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main hero image (background image)
  let imgEl = null;
  const focuspoint = element.querySelector('.focuspoint');
  if (focuspoint) {
    imgEl = focuspoint.querySelector('img');
  }

  // 2. Find hero content (heading, subheading, CTA, etc.)
  // This is inside .hero__info .hero__main__element
  let contentElement = null;
  const heroInfo = element.querySelector('.hero__info');
  if (heroInfo) {
    const mainElement = heroInfo.querySelector('.hero__main__element');
    if (mainElement && mainElement.childNodes.length > 0) {
      // Use the mainElement itself if there's content
      contentElement = mainElement;
    }
  }

  // Ensure empty row cells are added if there's no image or content
  // per the markdown example structure
  const rows = [
    ['Hero'],
    [imgEl ? imgEl : ''],
    [contentElement ? contentElement : '']
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
