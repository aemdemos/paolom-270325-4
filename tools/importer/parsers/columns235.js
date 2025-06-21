/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row has exactly one column, as per requirements
  const headerRow = ['Columns (columns235)'];

  // Find the left and right column contents
  let leftContent = document.createTextNode('');
  let rightContent = document.createTextNode('');

  // The left (image/logo) and right (text) content are both inside .textimage.parbase
  const main = element.querySelector('.container__main');
  if (main) {
    const mainEight = main.querySelector('.container__main__element--eight');
    if (mainEight) {
      const textimage = mainEight.querySelector('.textimage.parbase');
      if (textimage) {
        // left: image in .image img
        const img = textimage.querySelector('.image img');
        if (img) leftContent = img;
        // right: text in .text
        const text = textimage.querySelector('.text');
        if (text) rightContent = text;
      }
    }
  }

  // The second row should have as many columns as required (2 for this example)
  const cells = [
    headerRow,
    [leftContent, rightContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
