/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER must be 'Hero' as per example (first row, one column)
  const headerRow = ['Hero'];

  // Extract background image from style/background-image
  let imgEl = '';
  const style = element.getAttribute('style') || '';
  const match = style.match(/background-image:\s*url\(([^)]+)\)/i);
  if (match) {
    const imgUrl = match[1].replace(/['"]/g, '');
    imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imgEl.setAttribute('loading', 'lazy');
  }

  // Gather ALL child nodes of the element, including text nodes (for content row)
  // We grab all nodes (not just textContent) in case future HTML has headings/CTAs inside
  const contentNodes = Array.from(element.childNodes).filter(node => {
    // Skip empty text nodes
    return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
  });
  // If contentNodes is empty, use empty string (for empty rows in example)
  const contentCell = contentNodes.length > 0 ? contentNodes : '';

  // Build table, 3 rows, 1 column
  const cells = [
    headerRow,
    [imgEl],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
