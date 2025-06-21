/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main column containers
  const main = element.querySelector('.container__items.container__main');
  const aside = element.querySelector('.container__items.container__aside');

  // Helper to extract all content for a column, preserving structure
  function extractColumnContent(colContainer) {
    if (!colContainer) return document.createTextNode('');
    // The .aem__component > .container__item > .box--top is the structural root
    const item = colContainer.querySelector('.container__item');
    if (!item) return document.createTextNode('');
    const boxTop = item.querySelector('.box--top');
    if (!boxTop) return document.createTextNode('');
    // Collect all node children of boxTop except match-height--separator
    const nodes = Array.from(boxTop.childNodes).filter((node) => {
      // Filter out match-height--separator and empty text nodes
      if (node.nodeType === 1 && node.classList.contains('match-height--separator')) return false;
      if (node.nodeType === 3 && !node.textContent.trim()) return false;
      return true;
    });
    // In some cases, .video is a sibling to .box--top instead of inside
    // But in this HTML, .video is always inside .box--top
    // Just in case, check for any .video in the item that's NOT already in nodes
    const extraVideo = Array.from(item.querySelectorAll('.video'))
      .filter(v => !nodes.includes(v));
    if (extraVideo.length > 0) {
      nodes.push(...extraVideo);
    }
    // Return as array if >1 node, or the single node, or an empty node
    if (nodes.length === 0) return document.createTextNode('');
    if (nodes.length === 1) return nodes[0];
    return nodes;
  }

  const mainContent = extractColumnContent(main);
  const asideContent = extractColumnContent(aside);

  // Create the columns block table
  const cells = [
    ['Columns (columns13)'],
    [mainContent, asideContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
