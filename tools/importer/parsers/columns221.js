/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main and aside columns
  const mainColumn = element.querySelector('.container__items.container__main');
  const asideColumn = element.querySelector('.container__items.container__aside');

  // Helper to get all direct .aem__component > .container__item children content as a group
  function getColumnContent(col) {
    if (!col) return [];
    const component = col.querySelector('.aem__component');
    if (!component) return [];
    const item = component.querySelector('.container__item');
    if (!item) return [];
    // Get only non-empty children
    return Array.from(item.children).filter(e => {
      // Treat empty text blocks as empty
      if (e.classList.contains('text') && !e.textContent.trim()) return false;
      // Otherwise, keep
      return true;
    });
  }

  // Get columns content
  const leftCol = getColumnContent(mainColumn);
  const rightCol = getColumnContent(asideColumn);

  // Compose the block
  const headerRow = ['Columns (columns221)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  element.replaceWith(table);
}
