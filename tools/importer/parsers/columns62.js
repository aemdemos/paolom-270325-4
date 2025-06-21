/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find column items (as in HTML)
  const colItems = Array.from(element.querySelectorAll(':scope > .container__items > .container__main > .aem__component > .container__item.container__main__element'));

  if (!colItems.length) return;

  // The heading (leftmost column) is in the first col
  // Get the .box--top and its content
  const headingCol = colItems[0];
  let headingCell = null;
  // Get everything inside the first .box--top (should include .text.parbase)
  const firstBoxTop = headingCol.querySelector('.box--top');
  if (firstBoxTop) {
    headingCell = firstBoxTop;
  } else {
    headingCell = headingCol;
  }

  // For the other columns: use the .box--top contents (which holds textimage cards)
  const cardCols = colItems.slice(1).map((col) => {
    const boxTop = col.querySelector('.box--top');
    return boxTop || col;
  });

  // Table header as in the requirement
  const headerRow = ['Columns (columns62)'];
  // Compose the row for columns
  const contentRow = [headingCell, ...cardCols];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
