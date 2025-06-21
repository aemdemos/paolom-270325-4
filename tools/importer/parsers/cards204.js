/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the main card container nodes
  // Each card is .container__item under .container__items (there are 2)
  const cardContainers = Array.from(
    element.querySelectorAll('.container__item.container__main__element, .container__item.container__aside__element')
  );

  // Build table rows
  const rows = [];
  // Header row as in the example
  rows.push(['Cards (cards204)']);

  cardContainers.forEach((card) => {
    // Image: always in .image.parbase img (first one in this card)
    const img = card.querySelector('.image.parbase img');
    // Text: all of .text.parbase (may include headings, links, disclaimers, etc.)
    const text = card.querySelector('.text.parbase');
    // Defensive: only create row if both image and text are present
    if (img && text) {
      rows.push([img, text]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
