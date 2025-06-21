/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find the first <img> in a card
  function findImg(cardEl) {
    const img = cardEl.querySelector('img');
    return img || '';
  }

  // Helper: Get card content (title, desc, CTA)
  function getCardText(cardEl) {
    // Get the .textimage .image-text .text div
    const textDiv = cardEl.querySelector('.textimage .image-text .text');
    if (!textDiv) return '';
    // Gather all children except for empty nodes
    const nodes = [];
    Array.from(textDiv.childNodes).forEach((node) => {
      // Ignore empty text nodes
      if (node.nodeType === 3 && !node.textContent.trim()) return;
      // Keep <h3>, <p>, <a>, etc.
      if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
        nodes.push(node);
      }
    });
    return nodes.length === 1 ? nodes[0] : nodes;
  }

  // Each card: .container__item.container__main__element.box--white
  const cards = element.querySelectorAll('.container__item.container__main__element');
  const rows = [['Cards (cards131)']];

  cards.forEach(card => {
    const img = findImg(card);
    const text = getCardText(card);
    rows.push([img, text]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
