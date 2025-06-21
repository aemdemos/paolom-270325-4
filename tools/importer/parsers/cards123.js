/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block name and variant
  const headerRow = ['Cards (cards123)'];
  const cards = [];

  // Select all card containers (immediate children representing cards)
  const cardElements = element.querySelectorAll('.container__item.container__main__element');
  cardElements.forEach(cardEl => {
    // 1. IMAGE CELL
    let imageCell = '';
    const imageAnchor = cardEl.querySelector('.image a');
    if (imageAnchor) {
      // Prefer an <img> within the anchor
      const img = imageAnchor.querySelector('img');
      if (img) {
        imageCell = img;
      }
    }

    // 2. TEXT CELL
    let textCell;
    const textDiv = cardEl.querySelector('.text');
    if (textDiv) {
      // We'll reference an array of actual children (not clones), keeping their structure
      // Only use direct children: h3, p, and any CTA links (anchor tags)
      // But we need to exclude duplicate titles (the h3/heading is present twice, but only one is meaningful)
      const textParts = [];
      // Use the first h3 only (ignore a duplicate in the heading wrapper)
      const h3 = textDiv.querySelector('h3');
      if (h3) textParts.push(h3);
      // All non-empty <p>s (excluding those with only a CTA)
      textDiv.querySelectorAll('p').forEach(p => {
        if (!(p.childElementCount === 1 && p.querySelector('a') && p.textContent.trim() === p.querySelector('a').textContent.trim())) {
          textParts.push(p);
        }
      });
      // CTA: first anchor inside a <p> or directly in .text
      let ctaAnchor = null;
      textDiv.querySelectorAll('a').forEach(a => {
        // Only add if not already present in textParts
        if (!ctaAnchor && a.closest('p')) {
          ctaAnchor = a;
        }
      });
      if (ctaAnchor) {
        // Wrap CTA in a div for visual separation
        const div = document.createElement('div');
        div.appendChild(ctaAnchor);
        textParts.push(div);
      }
      // If no content, fallback to empty string
      textCell = textParts.length > 0 ? textParts : '';
    } else {
      textCell = '';
    }

    cards.push([imageCell, textCell]);
  });
  // Compose table rows
  const tableRows = [headerRow, ...cards];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
