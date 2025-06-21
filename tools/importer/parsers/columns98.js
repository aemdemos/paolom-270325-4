/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the direct child with a class
  function getDirectChildByClass(parent, className) {
    if (!parent) return null;
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // Find both main column containers
  const items = element.querySelectorAll(':scope > .container__items');
  // Defensive: If not exactly 2 columns, do not process
  if (items.length !== 2) return;

  // LEFT column: expects image
  let leftContent = '';
  {
    const leftAem = getDirectChildByClass(items[0], 'aem__component');
    const leftItem = getDirectChildByClass(leftAem, 'container__item');
    if (leftItem) {
      const boxTop = leftItem.querySelector('.box--top');
      if (boxTop) {
        // Look for first image inside boxTop
        const img = boxTop.querySelector('img');
        if (img) leftContent = img;
      }
    }
  }

  // RIGHT column: expects headings, paragraphs, and link
  let rightContent = '';
  {
    const rightAem = getDirectChildByClass(items[1], 'aem__component');
    const rightItem = getDirectChildByClass(rightAem, 'container__item');
    if (rightItem) {
      const boxTop = rightItem.querySelector('.box--top');
      if (boxTop) {
        // Use the whole .text.parbase (contains heading, paragraphs, link)
        const textDiv = boxTop.querySelector('.text.parbase');
        if (textDiv) rightContent = textDiv;
      }
    }
  }

  // Header row - must match exactly
  const cells = [
    ['Columns (columns98)'],
    [leftContent, rightContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
