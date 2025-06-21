/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards201)'];

  // All card containers
  const cardEls = element.querySelectorAll('.container__item.container__main__element');
  const rows = [headerRow];

  cardEls.forEach(cardEl => {
    // Left: Number (h2.alpha) - as element
    let leftCell = '';
    const h2Alpha = cardEl.querySelector('h2.alpha');
    if (h2Alpha) leftCell = h2Alpha;

    // Right: Heading (h2.weight--regular.size--30px) and description (p)
    const rightCellParts = [];
    const h2Title = cardEl.querySelector('h2.weight--regular.size--30px');
    if (h2Title) rightCellParts.push(h2Title);
    const descP = cardEl.querySelector('p');
    if (descP) rightCellParts.push(descP);
    // If nothing, make empty string
    const rightCell = rightCellParts.length === 1 ? rightCellParts[0] : (rightCellParts.length > 1 ? (() => { const d = document.createElement('div'); rightCellParts.forEach(p => d.appendChild(p)); return d; })() : '');

    rows.push([leftCell, rightCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
