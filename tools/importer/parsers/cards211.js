/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate card containers
  const cardContainers = Array.from(element.querySelectorAll(':scope > .container__items > .aem__component > .container__item'));

  // If not found (due to structure), try fallback
  if (cardContainers.length === 0) {
    // Sometimes .aem__component may be missing, or structure may differ
    const altCardContainers = Array.from(element.querySelectorAll(':scope > .container__items > .container__item'));
    if (altCardContainers.length > 0) {
      cardContainers.push(...altCardContainers);
    }
  }

  // Prepare rows with header
  const rows = [['Cards (cards211)']];

  // For each card, extract image and text content
  cardContainers.forEach(card => {
    // Get the image element
    let img = null;
    const imageDiv = card.querySelector('.image');
    if (imageDiv) {
      const imgEl = imageDiv.querySelector('img');
      if (imgEl) img = imgEl;
    }

    // Get the text content area
    let textContent = null;
    const textDiv = card.querySelector('.text');
    if (textDiv) textContent = textDiv;

    // Only add the row if we have at least image or text content
    if (img || textContent) {
      rows.push([
        img || '',
        textContent || ''
      ]);
    }
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}