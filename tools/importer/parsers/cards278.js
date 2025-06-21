/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card containers
  const cardNodes = Array.from(
    element.querySelectorAll('.container__item.container__main__element.border.box--white')
  );

  const rows = [];
  // Header row with the exact block name
  rows.push(['Cards (cards278)']);

  cardNodes.forEach((card) => {
    // IMAGE CELL
    let imageEl = null;
    // Try to find an actual <img> tag in the card
    const img = card.querySelector('.image img');
    if (img) {
      imageEl = img;
    }

    // TEXT CELL
    let textEl = null;
    const text = card.querySelector('.text');
    if (text) {
      // We want the full text block including heading, description, and CTA
      textEl = text;
    }

    // Push the row (image, text)
    rows.push([
      imageEl, // will be null if not found, which works for createTable
      textEl
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}