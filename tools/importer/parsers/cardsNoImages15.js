/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row, per block name in the task
  const headerRow = ['Cards (cardsNoImages15)'];

  // Get the main card content container
  const main = element.querySelector('.container__main');
  let cardNodes = [];
  if (main) {
    // Each card: div.text.parbase (immediate children in .container__main)
    cardNodes = Array.from(main.querySelectorAll(':scope .text.parbase'));
  }

  // Defensive: filter out empty cards
  const rows = cardNodes
    .filter(node => node && node.textContent.trim().length > 0)
    .map(card => [card]);

  // Compose final table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table in the DOM
  element.replaceWith(table);
}
