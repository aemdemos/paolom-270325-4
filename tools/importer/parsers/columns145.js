/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by class
  function getImmediateChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // Find both column containers
  const mainContainer = element.querySelector('.container__items.container__main');
  const asideContainer = element.querySelector('.container__items.container__aside');

  // Extract the column content
  let mainContent = null;
  let asideContent = null;

  if (mainContainer) {
    const comp = getImmediateChildByClass(mainContainer, 'aem__component');
    if (comp) {
      const mainItem = getImmediateChildByClass(comp, 'container__item');
      if (mainItem) {
        const textBlock = getImmediateChildByClass(mainItem, 'text');
        if (textBlock) mainContent = textBlock;
      }
    }
  }

  if (asideContainer) {
    const comp = getImmediateChildByClass(asideContainer, 'aem__component');
    if (comp) {
      const asideItem = getImmediateChildByClass(comp, 'container__item');
      if (asideItem) {
        const textBlock = getImmediateChildByClass(asideItem, 'text');
        if (textBlock) asideContent = textBlock;
      }
    }
  }

  // Compose the row with as many columns as found
  const row = [];
  row.push(mainContent || '');
  row.push(asideContent || '');

  // Fix: Header row must be ONE cell regardless of column count
  const headerRow = ['Columns (columns145)'];

  // Build the cells array
  const cells = [headerRow, row];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
