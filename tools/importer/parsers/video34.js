/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly as in the example, one cell only
  const headerRow = ['Video (video34)'];

  // Content row: should contain all visible content (poster image, titles, video link, duration, etc.)
  const cellContent = [];

  // Find the main poster image (the video thumbnail)
  // Use the first <img> inside the element
  const posterImg = element.querySelector('img');
  if (posterImg) {
    cellContent.push(posterImg);
  }

  // Find all visible title/duration/info blocks inside the video block
  // Use all .video__info blocks, but exclude visuallyhidden content
  const infoDivs = element.querySelectorAll('.video__info');
  infoDivs.forEach((div) => {
    // Remove visuallyhidden spans from the info div
    div.querySelectorAll('.visuallyhidden').forEach(vh => vh.remove());
    // Only push if there's visible text after cleaning
    if (div.textContent.replace(/\s+/g, '').length > 0) {
      cellContent.push(div);
    }
  });

  // Add the YouTube link (from the anchor)
  const anchor = element.querySelector('a[href*="youtube.com"]');
  if (anchor) {
    const href = anchor.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = href;
      cellContent.push(link);
    }
  }

  // As a fallback: ensure no visible text content is missing (e.g. direct text nodes)
  // Check all direct children for stray text nodes not already included
  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
      cellContent.push(document.createTextNode(node.textContent.trim()));
    }
  });

  // Compose the table
  const cells = [
    headerRow,
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
