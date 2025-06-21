/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row
  const rows = [['Cards (cardsNoImages302)']];

  // Try to find the grid container that holds the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Attempt to find the columns: main (usually image/icon) and aside (text content)
  // Look for .container__items in the grid
  const colItems = grid.querySelectorAll(':scope > .border .container__items');

  // Defensive: if structure changes, fallback to .container__items directly under grid
  const mainItem = colItems.length > 0 ? colItems[0] : grid.querySelector('.container__items.container__main');
  const asideItem = colItems.length > 1 ? colItems[1] : grid.querySelector('.container__items.container__aside');

  // Get the icon/image (if present) from the main column
  let iconEl;
  if (mainItem) {
    const possibleIcon = mainItem.querySelector('img');
    if (possibleIcon) {
      // wrap in a <p style="text-align: center"> as in source
      const p = document.createElement('p');
      p.style.textAlign = 'center';
      p.appendChild(possibleIcon);
      iconEl = p;
    }
  }

  // Get the card content from the aside column
  let cardContentEls = [];
  if (asideItem) {
    const textContainer = asideItem.querySelector('.text.parbase');
    if (textContainer) {
      // Collect the heading, paragraphs, and CTA (if any)
      // Only keep non-empty nodes
      textContainer.childNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node.textContent.trim() || (node.tagName && node.tagName.toLowerCase() === 'a'))
        ) {
          cardContentEls.push(node);
        }
      });
    }
  }

  // Compose the card cell: icon (if present) + card content
  const cardCellContent = [];
  if (iconEl) cardCellContent.push(iconEl);
  if (cardContentEls.length > 0) cardCellContent.push(...cardContentEls);

  // Only add the row if there's card content
  if (cardCellContent.length > 0) {
    rows.push([cardCellContent]);
  }

  // Create the table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
