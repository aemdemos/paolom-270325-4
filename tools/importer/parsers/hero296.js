/* global WebImporter */
export default function parse(element, { document }) {
  // HERO block: Header row, (optional) image row, content row with all text content
  // The example does not require a Section Metadata block, so do not add it.
  // Header row must be exactly 'Hero' as per the example.
  const headerRow = ['Hero'];

  // Image row: find first <img> in element OR leave empty if none
  let imageRow = [''];
  const img = element.querySelector('img');
  if (img) imageRow = [img];

  // Content row: Collect all direct headings (h1-h6), paragraphs, and direct text nodes,
  // in order, from element and its immediate children, preserving semantic structure.
  const contentNodes = [];
  // Helper to push block-level node or significant text
  function pushNode(n) {
    if (n.nodeType === 1 && ['H1','H2','H3','H4','H5','H6','P'].includes(n.tagName)) {
      contentNodes.push(n);
    } else if (n.nodeType === 3 && n.textContent.trim()) {
      // Non-empty direct text node, wrap in <span> for safety
      const span = document.createElement('span');
      span.textContent = n.textContent.trim();
      contentNodes.push(span);
    }
  }
  // Process immediate children, but also process top-level text nodes
  element.childNodes.forEach((node) => {
    if (node.nodeType === 1 && node.tagName === 'DIV') {
      // For direct divs: add their block-level children (h1-h6, p) and direct text
      node.childNodes.forEach(pushNode);
    } else {
      pushNode(node);
    }
  });

  // If nothing was found for text, fallback to all text content in element
  const contentRow = [contentNodes.length ? contentNodes : element.textContent.trim()];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
