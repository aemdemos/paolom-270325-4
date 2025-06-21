/* global WebImporter */
export default function parse(element, { document }) {
  // Find all column items
  const columnItems = element.querySelectorAll('.container__item.container__main__element');

  // Build cells for the columns block table
  const columns = [];
  columnItems.forEach((col) => {
    // The main content is in .box--top
    const boxTop = col.querySelector('.box--top');
    const cellContent = [];
    if (boxTop) {
      // For each .text.parbase inside .box--top
      boxTop.querySelectorAll('.text.parbase').forEach((textBlock) => {
        // For each child <p> in this block
        textBlock.querySelectorAll('p').forEach(p => {
          // If the <p> contains an <img>, add the <img> element
          const img = p.querySelector('img');
          if (img) {
            cellContent.push(img);
            return;
          }
          // If the <p> contains a link, add the <a> element
          const a = p.querySelector('a');
          if (a) {
            cellContent.push(a);
            return;
          }
          // If the <p> has other text, add it
          if (p.textContent && p.textContent.trim()) {
            cellContent.push(p);
            return;
          }
        });
      });
    }
    // Only push non-empty columns -- but must have the same number of cells as columns
    columns.push(cellContent.length === 1 ? cellContent[0] : cellContent);
  });

  // Table header matches block name exactly
  const tableData = [
    ['Columns (columns137)'],
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
