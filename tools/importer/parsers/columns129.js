/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left (main) and right (aside) column containers
  const mainColumn = element.querySelector('.container__items.container__main');
  const asideColumn = element.querySelector('.container__items.container__aside');
  if (!mainColumn || !asideColumn) return;

  // Helper to flatten all direct .text.parbase blocks in a column into a single <div>
  function getColumnContent(col) {
    const comp = col.querySelector(':scope > .aem__component');
    let blocks = [];
    if (comp) {
      blocks = Array.from(comp.querySelectorAll(':scope > .container__item > .text'));
    } else {
      blocks = Array.from(col.querySelectorAll(':scope > .aem__component .text'));
    }
    // If nothing found, fallback to all children
    if (blocks.length === 0) blocks = Array.from(col.children);
    // Filter out empty text nodes and such
    blocks = blocks.filter(Boolean);
    // If only one block, just return that block
    if (blocks.length === 1) return blocks[0];
    // Otherwise, wrap them in a single <div>
    const wrapper = document.createElement('div');
    blocks.forEach(b => wrapper.appendChild(b));
    return wrapper;
  }

  const leftCell = getColumnContent(mainColumn);
  const rightCell = getColumnContent(asideColumn);

  const cells = [
    ['Columns (columns129)'],
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
