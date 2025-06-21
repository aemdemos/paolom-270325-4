/* global WebImporter */
export default function parse(element, { document }) {
  // Find each card block
  const cardDivs = Array.from(element.querySelectorAll(':scope > .container__items .container__item'));
  const rows = [];
  rows.push(['Cards (cards256)']); // Header row matches the block name exactly

  cardDivs.forEach(cardDiv => {
    // Find .producttile inside this card
    const productTile = cardDiv.querySelector('.producttile');
    if (!productTile) return;
    const productTilesMain = productTile.querySelector('.product-tiles');
    if (!productTilesMain) return;
    // --- IMAGE ---
    let img = null;
    const feature = productTilesMain.querySelector('.feature');
    if (feature) {
      const imgLink = feature.querySelector('a');
      if (imgLink) {
        const imgEl = imgLink.querySelector('img');
        if (imgEl) img = imgEl;
      }
    }
    // --- TEXT CONTENT ---
    const textContent = [];
    // Title
    const h3 = productTilesMain.querySelector('h3.title');
    if (h3) {
      // Remove any child icons/spans from this heading, but reference the element itself
      // Remove the span.icon if present
      Array.from(h3.querySelectorAll('span')).forEach(s => s.remove());
      textContent.push(h3);
    }
    // Feature list
    if (feature) {
      const ul = feature.querySelector('ul.ticked');
      if (ul) {
        textContent.push(ul);
      }
    }
    // Offer (main paragraph in .offer)
    const offer = productTilesMain.querySelector('.productoffer .offer');
    if (offer) {
      // Only reference the offer main paragraph (not icon)
      const offerP = offer.querySelector('p, p.paragraph-text--regular');
      if (offerP) textContent.push(offerP);
    }
    // CTA button
    const btn = productTilesMain.querySelector('.btn');
    if (btn) textContent.push(btn);
    rows.push([
      img ? img : '',
      textContent.length ? textContent : ''
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
