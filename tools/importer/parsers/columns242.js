/* global WebImporter */
export default function parse(element, { document }) {
  // Find all column items under the main container
  const colItems = Array.from(element.querySelectorAll('.container__item.container__main__element'));
  
  // For each, find the inner .image-text block and create a column cell
  const columns = colItems.map((colItem) => {
    const imageText = colItem.querySelector('.image-text');
    if (!imageText) return '';

    // There are two .clearfix inside: first is heading (empty), second contains image+text
    const clearfixes = imageText.querySelectorAll('.clearfix');
    let contentRow;
    if (clearfixes.length > 1) {
      // Use the second .clearfix (which contains the content)
      contentRow = clearfixes[1];
    } else {
      contentRow = imageText;
    }
    // The content is a .image and a .text sibling
    const imageDiv = contentRow.querySelector('.image');
    const textDiv = contentRow.querySelector('.text');

    // Create a wrapper for the cell content
    const wrap = document.createElement('div');
    if (imageDiv) wrap.appendChild(imageDiv);
    if (textDiv) wrap.appendChild(textDiv);
    return wrap.childNodes.length ? wrap : '';
  });

  // If there are no columns, do nothing
  if (!columns.length || columns.every(cell => !cell)) return;

  // Compose cells: first row is header, second row is the columns
  const cells = [
    ['Columns (columns242)'],
    columns
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
