/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards215)'];
  const cardRows = [];

  // Get all card containers (each card)
  const cardElements = element.querySelectorAll('.container__item.container__main__element');
  cardElements.forEach(card => {
    // Get the image element
    let img = null;
    const imageDiv = card.querySelector('.image');
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // Get the text content (title, description, CTA)
    const textDiv = card.querySelector('.text');
    let textNode = null;
    if (textDiv) {
      // Reference the original textDiv directly to retain original semantics
      textNode = textDiv;
    }

    // Always include two cells per card (image, text)
    cardRows.push([img || '', textNode || '']);
  });

  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
