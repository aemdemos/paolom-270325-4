/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec
  const headerRow = ['Cards (cards299)'];
  const cardRows = [];

  // Get all card containers
  const cardContainers = Array.from(
    element.querySelectorAll('.container__item.container__main__element')
  );

  cardContainers.forEach(card => {
    // Find image element
    let imgEl = null;
    const img = card.querySelector('.image img');
    if (img) imgEl = img;

    // Find main text container (resilient to variations)
    let textContainer = card.querySelector('.text[data-emptytext="Text"]');
    if (!textContainer) {
      // Fallback: .text inside .image-text
      textContainer = card.querySelector('.image-text .text');
    }
    if (!textContainer) {
      // Fallback: any .text
      textContainer = card.querySelector('.text');
    }
    if (textContainer) {
      // Remove empty trailing <p> (e.g., <p>&nbsp;</p> or whitespace)
      const ps = Array.from(textContainer.querySelectorAll('p'));
      for (let i = ps.length - 1; i >= 0; i--) {
        if (!ps[i].textContent.trim()) {
          ps[i].remove();
        } else {
          break;
        }
      }
    }

    cardRows.push([
      imgEl,
      textContainer
    ]);
  });

  const tableCells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
