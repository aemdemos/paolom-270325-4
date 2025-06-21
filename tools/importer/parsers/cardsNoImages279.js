/* global WebImporter */
export default function parse(element, { document }) {
  // Build the rows for the cards block
  const rows = [['Cards (cardsNoImages279)']];

  // Find the aside content area containing all the cards
  const aside = element.querySelector('.container__items.container__aside');
  if (!aside) return;
  const textBlock = aside.querySelector('.text');
  if (!textBlock) return;
  const children = Array.from(textBlock.children);

  // Parse cards: each card starts with an h3, followed by one or more p (and possibly a link in the p)
  let i = 0;
  while (i < children.length) {
    if (children[i].tagName === 'H3') {
      const cardContent = [children[i]];
      i++;
      // Collect all p's after the h3 (stopping at next h3 or end)
      while (i < children.length && children[i].tagName === 'P') {
        cardContent.push(children[i]);
        i++;
      }
      rows.push([cardContent]);
    } else {
      i++;
    }
  }

  // Create the cards block using the helper
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
