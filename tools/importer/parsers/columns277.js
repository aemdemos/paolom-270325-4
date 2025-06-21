/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left column: .container__main
  const mainCol = element.querySelector('.container__items.container__main');
  // Find the right column: .container__aside
  const asideCol = element.querySelector('.container__items.container__aside');

  // Extract left column content (Image + empty text)
  let leftContent = '';
  if (mainCol) {
    const comp = mainCol.querySelector('.aem__component');
    if (comp) {
      leftContent = comp;
    } else {
      leftContent = mainCol;
    }
  }

  // Extract right column content (Text blocks)
  let rightContent = '';
  if (asideCol) {
    const comp = asideCol.querySelector('.aem__component');
    if (comp) {
      rightContent = comp;
    } else {
      rightContent = asideCol;
    }
  }

  // Header row: Only one column (matching the example structure)
  const headerRow = ['Columns (columns277)'];
  // Content row: two columns (left and right)
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
