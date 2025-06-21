/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards84)'];

  // Find all card containers (each card)
  const cardEls = Array.from(element.querySelectorAll('.container__item.container__main__element'));

  // Build the card rows: [image, text]
  const rows = cardEls.map(card => {
    // IMAGE CELL: use the <img> directly from the card
    const img = card.querySelector('img');
    const imageCell = img || '';

    // TEXT CELL: gather all text content including region, name, title, description, CTA
    const parts = [];

    // Region title: '.box--top .text h3' is the location/region (e.g., "New South Wales")
    const regionTitle = card.querySelector('.box--top .text h3');
    if (regionTitle) parts.push(regionTitle);

    // Details block: name, description, CTA - all under .image-text .text
    const detailsBlock = card.querySelector('.image-text .text');
    if (detailsBlock) {
      Array.from(detailsBlock.childNodes).forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim())) {
          parts.push(child);
        }
      });
    }

    // In rare cases if nothing found, include all <p> in card (fallback)
    if (!regionTitle && !detailsBlock) {
      const fallbackPs = card.querySelectorAll('p');
      fallbackPs.forEach(p => parts.push(p));
    }

    // If parts has only one element, use it directly, otherwise as an array
    const textCell = parts.length === 1 ? parts[0] : parts;
    return [imageCell, textCell];
  });

  // Compose and replace
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
