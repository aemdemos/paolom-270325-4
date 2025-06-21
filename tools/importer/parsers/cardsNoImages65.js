/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the content block where the cards content is
  const cfValue = element.querySelector('.cmp-contentfragment__element-value');
  if (!cfValue) return;

  // We're looking for all <h2>s except ones with the text 'Key points', each marks the start of a card
  const nodes = Array.from(cfValue.childNodes);
  const cards = [];
  let cardHeading = null;
  let cardContent = [];
  let foundAnyCard = false;

  function pushCard() {
    if (cardHeading) {
      // Compose card content
      const cell = [cardHeading];
      if (cardContent.length > 0) {
        // Filter out empty text nodes
        const filtered = cardContent.filter(n => {
          if (n.nodeType === Node.ELEMENT_NODE) return true;
          if (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0) return true;
          return false;
        });
        if (filtered.length > 0) {
          cell.push(document.createElement('br'));
          cell.push(...filtered);
        }
      }
      cards.push([cell]);
      foundAnyCard = true;
    }
    cardContent = [];
    cardHeading = null;
  }

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (
      n.nodeType === Node.ELEMENT_NODE &&
      n.tagName.toLowerCase() === 'h2' &&
      n.textContent.trim().toLowerCase() !== 'key points'
    ) {
      pushCard();
      cardHeading = n;
    } else {
      if (cardHeading) {
        cardContent.push(n);
      }
    }
  }
  // Push last card if any
  pushCard();

  // Only build table if we found cards
  if (foundAnyCard) {
    const cells = [
      ['Cards (cardsNoImages65)'],
      ...cards
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
