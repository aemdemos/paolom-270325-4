/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card containers: both main and aside
  const cards = [];
  // Find all .container__item elements inside the block (recursively, since cards may be nested)
  element.querySelectorAll('.container__item').forEach(card => {
    // Only accept cards that have an image (to avoid separators)
    if (card.querySelector('img')) {
      cards.push(card);
    }
  });

  // Prepare table header
  const headerRow = ['Cards (cards182)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // IMAGE: Find the first <img> inside the card
    const img = card.querySelector('img');

    // TEXT: We want all content except the image - from the .text.parbase blocks directly inside .box--top
    const boxTop = card.querySelector('.box--top');
    let textDiv = document.createElement('div');
    if (boxTop) {
      // Select all .text.parbase blocks, but exclude the text inside the image block
      const textParbases = Array.from(boxTop.querySelectorAll(':scope > .text.parbase'));
      textParbases.forEach(tb => {
        // Only add if not empty
        if (tb.textContent.trim() || tb.querySelector('a,button,ul,h3,h4')) {
          textDiv.appendChild(tb);
        }
      });
    }
    // Row: [ image, textContent ]
    rows.push([img, textDiv]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
