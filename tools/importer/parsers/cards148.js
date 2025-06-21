/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main card container
  const border = element.querySelector('.border');
  if (!border) return;

  // There should be two columns: image (main), text (aside)
  const main = border.querySelector('.container__items.container__main');
  const aside = border.querySelector('.container__items.container__aside');
  if (!main || !aside) return;

  // Extract image: find the first <img> in the main column
  let img = null;
  const mainImg = main.querySelector('img');
  if (mainImg) img = mainImg;

  // Extract text content for right cell
  const asideComponent = aside.querySelector('.aem__component');
  const textCellElements = [];
  if (asideComponent) {
    // Heading: prefer h2, fallback to h3, etc.
    const heading = asideComponent.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCellElements.push(heading);
    // Description: all <p> without a link
    const descPs = Array.from(asideComponent.querySelectorAll('p')).filter(p => !p.querySelector('a') && p.textContent.trim());
    textCellElements.push(...descPs);
    // Call-to-action: the first link-containing <p>
    const ctaP = Array.from(asideComponent.querySelectorAll('p')).find(p => p.querySelector('a'));
    if (ctaP) textCellElements.push(ctaP);
  }

  // Only add the row if there is at least an image and some text
  if (!img && textCellElements.length === 0) return;

  const rows = [
    ['Cards (cards148)'],
    [img, textCellElements]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
