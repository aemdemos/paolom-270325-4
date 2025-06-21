/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards209) block header row
  const rows = [['Cards (cards209)']];

  // Each card is a .container__item.container__main__element
  const cardElements = element.querySelectorAll('.container__item.container__main__element');

  cardElements.forEach(cardEl => {
    // Image cell: the first .image img element
    const img = cardEl.querySelector('.image img');

    // Text cell: use the .text div as-is (reference, not clone)
    const textDiv = cardEl.querySelector('.text');

    // Only add card if both image and text are present
    if (img && textDiv) {
      rows.push([img, textDiv]);
    }
  });

  // Create the table block and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
