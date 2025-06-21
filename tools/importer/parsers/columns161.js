/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container holding the columns
  const main = element.querySelector('.container__items.container__main');
  if (!main) return;

  // Select all direct column items
  const colElems = Array.from(main.querySelectorAll(':scope > .container__item.container__main__element'));

  // For each column, extract all content from .image-text
  const columns = colElems.map((col) => {
    const imgText = col.querySelector('.image-text');
    if (imgText) {
      // Get all children of .image-text (want both image div and text div)
      return Array.from(imgText.children);
    }
    // Fallback: if no .image-text, include all children of .box--top
    const boxTop = col.querySelector('.box--top');
    if (boxTop) {
      return Array.from(boxTop.children);
    }
    // Fallback: whole column node
    return [col];
  });

  // Table header as per requirements
  const header = ['Columns (columns161)'];
  const rows = [header, columns];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
