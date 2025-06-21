/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card containers: .container__item.container__main__element.none
  const cardContainers = Array.from(element.querySelectorAll('.container__item.container__main__element.none'));

  const rows = [
    ['Cards (cards96)']
  ];

  cardContainers.forEach(card => {
    // Get the image element inside card (first <img> inside .image)
    let img = null;
    const imageDiv = card.querySelector('.image');
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }
    // Get the text element inside card (.text)
    let text = card.querySelector('.text');
    // Defensive: ensure at least one cell has content
    if (img || text) {
      rows.push([
        img || '',
        text || ''
      ]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
