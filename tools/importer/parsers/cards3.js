/* global WebImporter */
export default function parse(element, { document }) {
  // Find all cards (direct children only)
  const cardElements = element.querySelectorAll('.container__item.container__main__element');

  const rows = [];
  // Header row as per spec
  rows.push(['Cards (cards3)']);

  cardElements.forEach((card) => {
    // Image cell: first <img> inside card
    const img = card.querySelector('img');
    // Text content: .text descendant in card
    const textDiv = card.querySelector('.text');
    const textCellContent = [];
    if (textDiv) {
      // Heading (h3, h2, h4)
      const heading = textDiv.querySelector('h3, h2, h4');
      if (heading) textCellContent.push(heading);
      // Paragraphs (excluding ones with only image)
      const ps = Array.from(textDiv.querySelectorAll('p'));
      ps.forEach(p => {
        // If p only contains img and nothing else, skip
        if (p.querySelector('img') && p.textContent.trim() === '') {
          return;
        }
        // If p is a CTA (contains a button/link), include as-is
        textCellContent.push(p);
      });
    }
    // Build the row, referencing existing elements
    rows.push([
      img ? img : '',
      textCellContent
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
