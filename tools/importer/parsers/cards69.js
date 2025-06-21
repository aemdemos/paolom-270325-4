/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: always use the block name exactly
  const headerRow = ['Cards (cards69)'];

  // Get the main card image: the only <img> in the first .container__main
  let imageCell = '';
  const main = element.querySelector('.container__items.container__main');
  if (main) {
    const mainImg = main.querySelector('img');
    if (mainImg) imageCell = mainImg;
  }

  // Get the aside text content: title (h2), description (p), CTA (a)
  let textCellContent = [];
  const aside = element.querySelector('.container__items.container__aside');
  if (aside) {
    const h2 = aside.querySelector('h2');
    if (h2) textCellContent.push(h2);
    // Find the first non-empty <p> that isn't just whitespace or CTA
    const descP = Array.from(aside.querySelectorAll('p')).find(p => {
      if (!p.textContent.trim()) return false;
      if (p.querySelector('a')) return false; // skip CTA <p>
      return true;
    });
    if (descP) textCellContent.push(descP);
    // Find CTA link (first <a>)
    const cta = aside.querySelector('a');
    if (cta) textCellContent.push(cta);
  }

  // Ensure at least empty cells if nothing found
  if (!imageCell) imageCell = document.createTextNode("");
  if (textCellContent.length === 0) textCellContent = [document.createTextNode("")];

  const row = [imageCell, textCellContent];
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
