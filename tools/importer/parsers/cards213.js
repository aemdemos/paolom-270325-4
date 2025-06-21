/* global WebImporter */
export default function parse(element, { document }) {
  // The header row matches the required block name
  const headerRow = ['Cards (cards213)'];
  const rows = [headerRow];

  // Select all immediate card containers
  const cardElements = element.querySelectorAll(':scope > .container__items > .aem__component > .container__item');

  cardElements.forEach(card => {
    // IMAGE CELL
    let imgEl = null;
    const imageDiv = card.querySelector('.image');
    if (imageDiv) {
      // Find the <img>, but only if it exists
      imgEl = imageDiv.querySelector('img');
    }

    // TEXT CELL
    let textEl = null;
    // The .text container has all the textual content
    const textContainer = card.querySelector('.text');
    if (textContainer) {
      // Reference all children in order, skipping empty text nodes
      const nodes = [];
      for (const node of textContainer.childNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          nodes.push(node);
        }
      }
      // If we found at least one node, use them, else use the entire textContainer as fallback
      textEl = nodes.length > 1 ? nodes : (nodes.length === 1 ? nodes[0] : textContainer);
    }

    // Construct the row for this card
    rows.push([
      imgEl || '',
      textEl || ''
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
