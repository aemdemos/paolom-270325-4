/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main two-column grid
  const grid = element.querySelector('.container--two-columns .grid');
  if (!grid) return;

  // Find the two column DOM elements
  let mainCol = grid.querySelector('.border');
  let asideCol = grid.querySelector('.container__aside');

  // Extract main column content: all content inside .container__main
  let mainContent = [];
  if (mainCol) {
    const mainWrap = mainCol.querySelector('.container__main');
    if (mainWrap) {
      // Gather all direct children of .container__main > .aem__component > .container__item
      // but for robustness, just get all content inside .container__main
      // Sometimes there may be multiple .aem__component, so use all children
      let children = [];
      Array.from(mainWrap.children).forEach(child => {
        // Only include element nodes and skip empty wrappers
        if (child.children.length > 0 || (child.textContent && child.textContent.trim().length > 0)) {
          children.push(child);
        }
      });
      // If only one, flatten; if more, keep as array
      mainContent = children.length === 1 ? children[0] : children;
    }
  }

  // Extract aside column content: all content in aside, not just the image
  let asideContent = [];
  if (asideCol) {
    // Find .container__item inside asideCol (should contain all aside content)
    const asideItem = asideCol.querySelector('.container__item');
    if (asideItem) {
      Array.from(asideItem.children).forEach(child => {
        // Only include if not just whitespace
        if (child.children.length > 0 || (child.textContent && child.textContent.trim().length > 0)) {
          asideContent.push(child);
        }
      });
      // If only one, flatten; if more, keep as array
      asideContent = asideContent.length === 1 ? asideContent[0] : asideContent;
    }
  }

  // Table header: one cell, exactly as required
  const headerRow = ['Columns (columns143)'];
  // Content row: two columns
  const contentRow = [mainContent, asideContent];
  const cells = [headerRow, contentRow];

  // Create the table block and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
