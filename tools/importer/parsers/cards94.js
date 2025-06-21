/* global WebImporter */
export default function parse(element, { document }) {
  // Get all top-level card containers
  const cardContainers = Array.from(element.querySelectorAll(':scope > .container__items > .aem__component > .container__item.container__main__element'));
  const rows = [['Cards (cards94)']];

  cardContainers.forEach(card => {
    // Left cell: image
    let image = null;
    const imageDiv = card.querySelector('.image');
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }

    // Right cell: text (heading, body, link)
    let textDiv = card.querySelector('.text');
    // Defensive: skip empty cards
    if (!image && !textDiv) return;
    rows.push([image, textDiv]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}