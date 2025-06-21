/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card wrappers (each card)
  const cardWrappers = element.querySelectorAll('.container__item.container__main__element');
  const rows = [];
  // Header row as in the example
  rows.push(['Cards (cards245)']);
  cardWrappers.forEach((card) => {
    // Get image from the card
    let imgCell = '';
    const img = card.querySelector('.image img');
    if (img) {
      imgCell = img;
    }
    // Get text content from the card
    let textCell = '';
    const textDiv = card.querySelector('.text');
    if (textDiv) {
      textCell = textDiv;
    }
    rows.push([imgCell, textCell]);
  });
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
