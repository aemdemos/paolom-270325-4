/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards109)'];

  // Find the relevant .grid container
  const grid = element.querySelector('.grid');
  if (!grid) {
    // fallback: replace with header only if structure is broken
    const cells = [headerRow];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // Find the card container with the image (main) and with the text (aside)
  const mainContainer = grid.querySelector('.container__items.container__main .container__item');
  const asideContainer = grid.querySelector('.container__items.container__aside .container__item');

  // The image should be in mainContainer, as an <img>
  let imageEl = '';
  if (mainContainer) {
    imageEl = mainContainer.querySelector('img') || '';
  }
  // The text content is the entire asideContainer, which contains heading, p, links
  let textEl = '';
  if (asideContainer) {
    textEl = asideContainer;
  }

  // Assemble cells: header, then card row
  const cells = [headerRow, [imageEl, textEl]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
