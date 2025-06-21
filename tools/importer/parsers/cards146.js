/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Cards block
  const headerRow = ['Cards (cards146)'];

  // Find the grid containing the card columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // First column: image (left)
  const imageCol = grid.querySelector('.container__items.container__main .container__item');
  let imageEl = null;
  if (imageCol) {
    imageEl = imageCol.querySelector('img');
  }

  // Second column: text (right)
  const asideCol = grid.querySelector('.container__items.container__aside .container__item');
  let textCellContent = [];
  if (asideCol) {
    const textBlock = asideCol.querySelector('.text.parbase');
    if (textBlock) {
      // Get heading if present
      const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textCellContent.push(heading);
      // Get non-empty paragraph(s) that do not contain a link
      const descParas = Array.from(textBlock.querySelectorAll('p')).filter(p => {
        return p.textContent.trim().length > 0 && !p.querySelector('a');
      });
      textCellContent.push(...descParas);
      // Get cta link (keep parent <p> if not empty)
      const ctaP = Array.from(textBlock.querySelectorAll('p')).find(p => p.querySelector('a'));
      if (ctaP && ctaP.textContent.trim().length > 0) {
        textCellContent.push(ctaP);
      }
    }
  }

  // Prepare final rows
  const rows = [headerRow, [imageEl, textCellContent]];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
