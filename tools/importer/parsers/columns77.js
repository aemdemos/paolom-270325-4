/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first descendant by class
  function getFirstDescendantByClass(root, className) {
    if (!root) return null;
    const stack = [root];
    while (stack.length) {
      const node = stack.shift();
      if (node.classList && node.classList.contains(className)) return node;
      stack.push(...Array.from(node.children || []));
    }
    return null;
  }

  // Find .container__items children (main and aside columns)
  const containers = Array.from(element.querySelectorAll(':scope > .container__items'));
  let mainContent = null;
  let asideContent = null;

  containers.forEach((c) => {
    if (c.classList.contains('container__main')) mainContent = c;
    if (c.classList.contains('container__aside')) asideContent = c;
  });

  // Helper to get the top content block from a column
  function getColumnContentBlock(container, innerClass) {
    if (!container) return null;
    const item = getFirstDescendantByClass(container, innerClass);
    if (!item) return null;
    const boxTop = getFirstDescendantByClass(item, 'box--top');
    return boxTop || item;
  }

  const mainBlock = getColumnContentBlock(mainContent, 'container__main__element');
  const asideBlock = getColumnContentBlock(asideContent, 'container__aside__element');

  // If both columns are empty, bail out (edge case)
  if (!mainBlock && !asideBlock) return;

  // Table header must match example exactly
  const headerRow = ['Columns (columns77)'];
  const contentRow = [mainBlock, asideBlock];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
