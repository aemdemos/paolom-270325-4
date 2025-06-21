/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const cells = [
    ['Cards (cards120)']
  ];

  // Find the card container: .container__items.container__main
  const cardsParent = element.querySelector('.container__items.container__main');
  if (!cardsParent) return;
  // each card is .container__item inside above
  const cardElements = Array.from(cardsParent.querySelectorAll('.container__item'));

  cardElements.forEach(card => {
    // Find the first img (icon) in the card, if present
    const img = card.querySelector('img');
    // Find the text block containing h3 and p
    const textBlock = card.querySelector('.text.parbase');
    const textContent = [];
    if (textBlock) {
      // Find heading (h3) and all description paragraphs (exclude <p> that only contains img)
      Array.from(textBlock.children).forEach(child => {
        // Skip img-only paragraphs
        if (child.tagName === 'P' && child.querySelector('img')) return;
        textContent.push(child);
      });
    }
    // Add to the table: image in first cell, text in second
    cells.push([
      img || '', // empty if no image
      textContent.length > 0 ? textContent : '' // either array of elements or empty
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
