/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all direct card blocks
  const cardRoots = Array.from(element.querySelectorAll(':scope > .container__items > .container__main > .aem__component > .container__item, :scope > .container__items > .container__main > .container__item'));
  // Fallback for ANZ markup (sometimes extra divs)
  if (cardRoots.length === 0) {
    // Try one level lower
    cardRoots.push(...element.querySelectorAll(':scope > .container__items .container__item.container__main__element'));
  }
  if (cardRoots.length === 0) {
    // fallback for more lenient selection
    cardRoots.push(...element.querySelectorAll('.container__item.container__main__element'));
  }
  const rows = [['Cards (cards282)']];
  cardRoots.forEach(cardRoot => {
    // Find image
    let imageEl = null;
    const imageContainer = cardRoot.querySelector('.image');
    if (imageContainer) {
      // Use the <img> inside the image container
      imageEl = imageContainer.querySelector('img');
    }
    // Find the text container
    const textContainer = cardRoot.querySelector('.text');
    const textCellParts = [];
    if (textContainer) {
      // Heading
      const heading = textContainer.querySelector('h3, h2, h4, h5, h6');
      if (heading) textCellParts.push(heading);
      // Paragraphs
      const paragraphs = Array.from(textContainer.querySelectorAll('p'));
      paragraphs.forEach(p => {
        const a = p.querySelector('a');
        if (a && a.textContent.trim().toLowerCase().startsWith('read more')) {
          // Assume this is CTA, add whole <p> at end
        } else {
          textCellParts.push(p);
        }
      });
      // CTA: find last p > a[href] with 'read more' or similar
      const ctaP = paragraphs.find(p => {
        const a = p.querySelector('a');
        return a && a.textContent.trim().toLowerCase().startsWith('read more');
      });
      if (ctaP) textCellParts.push(ctaP);
    }
    rows.push([
      imageEl,
      textCellParts
    ]);
  });
  // Replace only if there is at least one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
