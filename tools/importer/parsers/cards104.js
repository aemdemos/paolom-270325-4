/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block definition
  const headerRow = ['Cards (cards104)'];

  // Find grid, then border, which holds the two columns
  const grid = element.querySelector('.grid');
  let mainContainer = grid ? grid.querySelector('.border') : null;
  if (!mainContainer) mainContainer = element;

  // Get left and right columns
  const mainItem = mainContainer.querySelector('.container__items.container__main .container__item');
  const asideItem = mainContainer.querySelector('.container__items.container__aside .container__item');

  // --- IMAGE CELL ---
  let imageCell = '';
  if (mainItem) {
    const img = mainItem.querySelector('img');
    if (img) imageCell = img;
  }

  // --- TEXT + CTA CELL ---
  const textParts = [];
  if (asideItem) {
    // Heading (preserve heading level)
    const heading = asideItem.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textParts.push(heading);
    // Description: first non-empty, non-link paragraph
    const paragraphs = Array.from(asideItem.querySelectorAll('p'));
    let descPara = null;
    for (const p of paragraphs) {
      if (
        p.textContent.trim().length > 0 &&
        !p.querySelector('a') &&
        // skip if this is only whitespace
        p.textContent.replace(/\u00a0|\s/g, '').length > 0
      ) {
        descPara = p;
        break;
      }
    }
    if (descPara) textParts.push(descPara);
    // CTA (link)
    const cta = asideItem.querySelector('a');
    if (cta) textParts.push(cta);
  }

  // Compose the card row
  const cardRow = [imageCell, textParts];
  // Build the table cell structure
  const cells = [headerRow, cardRow];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
