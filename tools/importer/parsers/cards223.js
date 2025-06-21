/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all cards within the main element
  const cardEls = Array.from(element.querySelectorAll('.container__item.container__main__element'));
  const rows = [];
  // Header row as per block spec
  rows.push(['Cards (cards223)']);

  cardEls.forEach(cardEl => {
    // --- IMAGE CELL ---
    let imgEl = '';
    const imgWrapper = cardEl.querySelector('.image');
    if (imgWrapper) {
      // Get first <img> if any
      const foundImg = imgWrapper.querySelector('img');
      if (foundImg) imgEl = foundImg;
    }

    // --- TEXT CELL ---
    let textCell = '';
    const textEl = cardEl.querySelector('.text');
    if (textEl) {
      // Remove empty .heading if present
      const emptyHeadings = textEl.querySelectorAll('.heading');
      emptyHeadings.forEach(h => { if(!h.textContent.trim()) h.remove(); });
      textCell = textEl;
    }
    rows.push([imgEl, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
