/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the spec
  const headerRow = ['Cards (cards136)'];
  const rows = [headerRow];

  // Helper to extract card info from a .container__item
  function extractCard(cardEl) {
    // Get image (first <img> in .image)
    let img = null;
    const imgContainer = cardEl.querySelector('.image');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Get text container
    const textContainer = cardEl.querySelector('.text');
    const textDiv = document.createElement('div');
    if (textContainer) {
      // Title (first heading)
      const title = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        textDiv.appendChild(title);
      }
      // Description (all <p> before a CTA)
      const ps = Array.from(textContainer.querySelectorAll('p'));
      let cta = null;
      let descPs = ps;
      if (ps.length > 0) {
        // If last <p> is a CTA (contains only an <a> with 'Read more')
        const lastP = ps[ps.length - 1];
        const lastLink = lastP.querySelector('a');
        if (
          ps.length > 1 &&
          lastLink &&
          lastP.childNodes.length === 1 &&
          /^read more$/i.test(lastLink.textContent.trim())
        ) {
          descPs = ps.slice(0, -1);
          cta = lastLink;
        } else if (ps.length === 1 && lastLink && lastP.childNodes.length === 1 && /^read more$/i.test(lastLink.textContent.trim())) {
          descPs = [];
          cta = lastLink;
        }
      }
      descPs.forEach(p => textDiv.appendChild(p));
      if (cta) {
        textDiv.appendChild(cta);
      }
    }
    return [img, textDiv];
  }

  // Find both card containers
  const cardEls = [];
  const mainCardEl = element.querySelector('.container__items.container__main .container__item');
  if (mainCardEl) cardEls.push(mainCardEl);
  const asideCardEl = element.querySelector('.container__items.container__aside .container__item');
  if (asideCardEl) cardEls.push(asideCardEl);

  cardEls.forEach(cardEl => {
    const cells = extractCard(cardEl);
    rows.push(cells);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
