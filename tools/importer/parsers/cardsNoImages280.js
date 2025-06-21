/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block name
  const headerRow = ['Cards (cardsNoImages280)'];
  const rows = [headerRow];

  // Find the aside area with the cards
  const aside = element.querySelector('.container__items.container__aside');
  if (aside) {
    // Select all .image-text blocks inside aside
    const cardBlocks = aside.querySelectorAll('.image-text');
    cardBlocks.forEach(cardBlock => {
      // The text content for this card is in .text inside the image-text
      const text = cardBlock.querySelector('.text');
      if (text) {
        // Reference the existing .text element directly (do not clone)
        rows.push([text]);
      }
    });
  }

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
