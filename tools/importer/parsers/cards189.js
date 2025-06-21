/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the actual image element in a card block
  function getCardImage(mosaicblock) {
    // The image is always inside: .image img
    const img = mosaicblock.querySelector('img');
    return img;
  }

  // Helper to find the card text: heading, description, CTA
  function getCardText(mosaicblock) {
    const text = mosaicblock.querySelector('.text');
    if (!text) return null;
    const fragments = [];
    // Heading (h3/h2/h4)
    const heading = text.querySelector('h3, h2, h4');
    if (heading) fragments.push(heading);
    // Any <p> (could be description or cta)
    // preserve original order
    const ps = Array.from(text.querySelectorAll('p'));
    ps.forEach((p) => {
      // Only add non-empty paragraphs
      if (p.textContent.trim().length > 0) {
        fragments.push(p);
      }
    });
    // If there are no fragments, but text has content, use text as fallback
    if (fragments.length === 0 && text.textContent.trim().length > 0) {
      const p = document.createElement('p');
      p.textContent = text.textContent.trim();
      fragments.push(p);
    }
    return fragments;
  }

  // Find all .mosaicblock elements (each is a card)
  const blocks = element.querySelectorAll(':scope .mosaicblock');
  const rows = [];
  // Header row, must match example exactly
  rows.push(['Cards (cards189)']);

  blocks.forEach((block) => {
    const img = getCardImage(block);
    const textContent = getCardText(block);
    // Defensive: allow for cards where image or text might be missing
    // Only add a row if at least one cell has content (per block definition, both are mandatory but tolerate some missing data)
    if (img || (textContent && textContent.length)) {
      // If either is missing, use empty string
      rows.push([
        img || '',
        textContent && textContent.length ? textContent : ''
      ]);
    }
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
