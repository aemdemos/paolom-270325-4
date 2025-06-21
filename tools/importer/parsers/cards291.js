/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const headerRow = ['Cards (cards291)'];
  const cells = [headerRow];

  // Find the primary container holding the card items
  // .container__items or .container__main is a safe bet for where .container__item lives
  const itemsContainer = element.querySelector('.container__items, .container__main');
  if (!itemsContainer) return;

  // Each card is a .container__item (card)
  const cardEls = Array.from(itemsContainer.querySelectorAll(':scope > .aem__component > .container__item'));
  if (!cardEls.length) return;

  cardEls.forEach((card) => {
    // Find the card image (first .image img under this card)
    let imgEl = null;
    const img = card.querySelector('.image img');
    if (img) imgEl = img;

    // Find the text content
    // The text div holds the h3 (or h3.gamma) and paragraph content
    let textDiv = card.querySelector('.text');
    if (!textDiv) {
      // As fallback, try any heading and its following siblings
      textDiv = document.createElement('div');
      const h3 = card.querySelector('h3, .gamma');
      if (h3) textDiv.appendChild(h3);
      // Add all <p> siblings after h3
      let sibling = h3 ? h3.nextElementSibling : null;
      while (sibling) {
        if (sibling.tagName === 'P') {
          textDiv.appendChild(sibling);
        }
        sibling = sibling.nextElementSibling;
      }
    }
    cells.push([
      imgEl,
      textDiv
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
