/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area with the cards info
  const cfContainer = element.querySelector('.articlehubcontainer.contentfragment');
  if (!cfContainer) return;
  const cfElement = cfContainer.querySelector('.cmp-contentfragment__element-value');
  if (!cfElement) return;

  // Get all direct children (H2, H3, UL, P) in order, including lists, for semantic meaning
  const children = Array.from(cfElement.childNodes).filter(n => n.nodeType === 1 && (n.tagName.match(/^H2$|^H3$|^UL$|^P$/)));

  // Split content into cards: each card begins with H2, and contains elements until the next H2 or end
  const cards = [];
  let i = 0;
  while (i < children.length) {
    const node = children[i];
    if (node.tagName === 'H2') {
      const startIdx = i;
      const cardEls = [];
      cardEls.push(children[i]); // reference, NOT clone
      i++;
      // gather subsequent nodes until next H2 or end
      while (i < children.length && children[i].tagName !== 'H2') {
        // skip empty paragraphs for cleanliness
        if (children[i].tagName === 'P' && !children[i].textContent.trim()) {
          i++;
          continue;
        }
        cardEls.push(children[i]); // reference, NOT clone
        i++;
      }
      // Exclude 'Key points' section (functions as intro/summary, not a card)
      if (node.textContent.trim() !== 'Key points') {
        cards.push(cardEls);
      }
    } else {
      i++;
    }
  }

  // Build the table for the block
  const cells = [
    ['Cards (cardsNoImages236)'],
    ...cards.map(cardEls => [cardEls])
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
