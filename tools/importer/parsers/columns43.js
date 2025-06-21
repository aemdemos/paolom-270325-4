/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two columns by their main container classes
  const columns = [
    element.querySelector('.container__main'),
    element.querySelector('.container__aside'),
  ];

  // Helper to extract the content area from a column
  function getColumnContent(container) {
    if (!container) return '';
    // The main content is inside .container__item > .box--top
    const item = container.querySelector(':scope > .aem__component > .container__item');
    if (!item) return '';
    const box = item.querySelector(':scope > .box--top');
    if (!box) return '';
    return box;
  }

  const leftContent = getColumnContent(columns[0]);
  const rightContent = getColumnContent(columns[1]);

  // Critical fix: Header row must have exactly one column (not two)
  const cells = [
    ['Columns (columns43)'], // header row: single cell only
    [leftContent || '', rightContent || ''], // content row: two cells/columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}