/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get the first img inside a block (reference original element!)
  function getCardImage(card) {
    // Look for the .image inside the card
    const imageContainer = card.querySelector('.image');
    if (!imageContainer) return '';
    // Prefer <img> that is a direct child, otherwise descendents
    const img = imageContainer.querySelector('img');
    return img || '';
  }
  // Helper: Get the text block (heading, description, CTA), referencing existing nodes
  function getCardTextBlock(card) {
    const textDiv = card.querySelector('.text');
    if (!textDiv) return '';
    // We'll collect all direct children that are headings or paragraphs
    const nodes = [];
    // Heading (h1-h6)
    const heading = textDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) nodes.push(heading);
    // Paragraphs (p)
    const ps = Array.from(textDiv.querySelectorAll('p'));
    ps.forEach((p) => {
      // Only add if not empty or whitespace
      if (p.textContent.replace(/\u00a0/g, '').replace(/\s+/g, '').length > 0 || p.querySelector('a')) {
        nodes.push(p);
      }
    });
    // If only one node, just return that node, else array
    if (nodes.length === 1) return nodes[0];
    if (nodes.length === 0) return '';
    return nodes;
  }
  // Find all cards
  const cardItems = Array.from(element.querySelectorAll('.container__item.container__main__element'));
  const rows = [];
  // Header row - exactly as in the example
  rows.push(['Cards (cards228)']);
  cardItems.forEach(cardItem => {
    const textimage = cardItem.querySelector('.textimage');
    if (!textimage) return;
    const img = getCardImage(textimage);
    const textBlock = getCardTextBlock(textimage);
    rows.push([
      img ? img : '',
      textBlock ? textBlock : ''
    ]);
  });
  // Replace the element with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
