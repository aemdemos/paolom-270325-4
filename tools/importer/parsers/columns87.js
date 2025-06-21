/* global WebImporter */
export default function parse(element, { document }) {
  // The Columns block has two columns: left (main) and right (aside)
  // Find the left (main) column content
  let mainCol = element.querySelector('.container__main');
  let asideCol = element.querySelector('.container__aside');

  // Fallbacks if structure changes
  if (!mainCol && element.children.length > 0) mainCol = element.children[0];
  if (!asideCol && element.children.length > 1) asideCol = element.children[1];

  // Find the main column content: should be the .box--top div
  let mainContent = null;
  if (mainCol) {
    const mainBox = mainCol.querySelector('.box--top');
    if (mainBox) {
      mainContent = mainBox;
    } else {
      mainContent = mainCol;
    }
  }

  // Find the aside column content: should be the .box--top div
  let asideContent = null;
  if (asideCol) {
    const asideBox = asideCol.querySelector('.box--top');
    if (asideBox) {
      asideContent = asideBox;
    } else {
      asideContent = asideCol;
    }
  }

  // Build the columns block table
  const headerRow = ['Columns (columns87)'];
  const contentRow = [mainContent, asideContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
