/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const headerRow = ['Cards (cards169)'];
  const rows = [];

  // Select all cards
  const cards = element.querySelectorAll('.container__item.container__main__element');

  cards.forEach(card => {
    // --- IMAGE CELL ---
    let img = null;
    const h3Image = card.querySelector('h3 a img');
    if (h3Image) img = h3Image;

    // --- TEXT CELL ---
    const cellContents = [];
    // Second h3: the title
    const h3s = card.querySelectorAll('h3');
    if (h3s.length > 1) {
      cellContents.push(h3s[1]);
    }

    // Description: the first p with real text (no link, not empty)
    const ps = card.querySelectorAll('p');
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      if (!p.querySelector('a') && p.textContent.trim().replace(/\s+/g,'').length > 0) {
        cellContents.push(p);
        break;
      }
    }
    // CTA: the first a inside a p
    for (let i = 0; i < ps.length; i++) {
      const a = ps[i].querySelector('a');
      if (a) {
        cellContents.push(a);
        break;
      }
    }
    // If there is only one cell content, don't wrap as array
    let textCell = '';
    if (cellContents.length > 1) textCell = cellContents;
    else if (cellContents.length === 1) textCell = cellContents[0];

    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
