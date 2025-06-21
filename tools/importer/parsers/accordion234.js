/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion header row (must match exactly the block name)
  const headerRow = ['Accordion (accordion234)'];

  // Find the main article content area
  const contentRoot = element.querySelector('.cmp-contentfragment__element-value');
  if (!contentRoot) return;

  // Get all child nodes of the content
  const children = Array.from(contentRoot.childNodes);

  // Find all h2 elements (which define accordion titles)
  const h2Indices = [];
  children.forEach((node, idx) => {
    if (node.nodeType === 1 && node.tagName.toLowerCase() === 'h2') {
      h2Indices.push(idx);
    }
  });

  // If no h2s, do not create a block
  if (!h2Indices.length) return;

  // Build rows for each accordion item
  const rows = [headerRow];
  for (let i = 0; i < h2Indices.length; i++) {
    const startIdx = h2Indices[i];
    const endIdx = (i + 1 < h2Indices.length) ? h2Indices[i + 1] : children.length;
    const titleElem = children[startIdx]; // the h2
    // Content nodes: all between titleElem and next h2
    const contentNodes = [];
    for (let j = startIdx + 1; j < endIdx; j++) {
      const node = children[j];
      // skip empty text nodes
      if (node && (node.nodeType !== 3 || node.textContent.trim() !== '')) {
        contentNodes.push(node);
      }
    }
    // Edge: if empty, skip
    if (!contentNodes.length) continue;
    // If contentNodes is one node, use directly, else as array
    rows.push([
      titleElem,
      contentNodes.length === 1 ? contentNodes[0] : contentNodes
    ]);
  }

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
