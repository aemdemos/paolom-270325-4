/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards232)'];
  
  // Helper: Given a .image-text element, extract the image (img) element
  function getCardImage(imageTextEl) {
    // Look for the .image container inside .image-text
    const imageContainer = imageTextEl.querySelector('.image');
    if (imageContainer) {
      // Look for img inside imageContainer
      const img = imageContainer.querySelector('img');
      if (img) return img;
    }
    // Fallback: look for img anywhere inside imageTextEl
    const img = imageTextEl.querySelector('img');
    if (img) return img;
    return '';
  }

  // Helper: Given a .image-text element, extract the text (title, desc, cta)
  function getCardText(imageTextEl) {
    const textEl = imageTextEl.querySelector('.text');
    if (textEl) return textEl;
    // fallback: look for any element with non-empty text
    const allDivs = imageTextEl.querySelectorAll('div');
    for (const d of allDivs) {
      if (d.textContent && d.textContent.trim().length > 0) return d;
    }
    return '';
  }

  // Find all .image-text blocks in the element
  const imageTextBlocks = element.querySelectorAll('.image-text');

  // If no cards, then do nothing (no-op, as nothing to parse)
  if (imageTextBlocks.length === 0) {
    // There are no card blocks in this section
    return;
  }

  // Build card rows
  const rows = [];
  imageTextBlocks.forEach(card => {
    const img = getCardImage(card);
    const txt = getCardText(card);
    rows.push([img, txt]);
  });

  // Compose table data
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
