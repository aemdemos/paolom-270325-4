/* global WebImporter */
export default function parse(element, { document }) {
  // Collect each column's content
  const columnNodes = element.querySelectorAll('.container__item.container__main__element');

  // Extract content for each column
  const columns = Array.from(columnNodes).map(col => {
    // Attempt to get the innermost content container
    let contentContainer = col.querySelector('.box--top .text.parbase > div');
    if (!contentContainer) {
      contentContainer = col.querySelector('.box--top .text.parbase');
    }
    if (!contentContainer) {
      contentContainer = col.querySelector('.box--top');
    }
    if (!contentContainer) {
      contentContainer = col;
    }
    return contentContainer;
  });

  // Table with header row (single cell) and content row (multiple cells)
  const tableArr = [
    ['Columns (columns157)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}
