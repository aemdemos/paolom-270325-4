/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the requirement
  const headerRow = ['Cards (cards260)'];

  // Find card containers: .container__item.container__main__element
  const cardElements = element.querySelectorAll('.container__item.container__main__element');
  const rows = [];

  cardElements.forEach(card => {
    // Card main content inside .text.parbase
    const cardContent = card.querySelector('.text.parbase');
    if (!cardContent) return;

    // FIRST CELL: Image/Icon (mandatory)
    let imgEl = cardContent.querySelector('img');
    let imageCell = '';
    if (imgEl) imageCell = imgEl;

    // SECOND CELL: Text content (title, description, list, CTA, disclaimers, etc)
    const textCellContent = [];

    // Add heading (h2, h3, h4)
    const heading = cardContent.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCellContent.push(heading);

    // Add any lists (<ul> or <ol>), each as-is
    cardContent.querySelectorAll('ul, ol').forEach(list => {
      textCellContent.push(list);
    });

    // Add all <p> (exclude any containing only images)
    cardContent.querySelectorAll('p').forEach(p => {
      // If this <p> contains only an <img>, skip (is in image cell already)
      if (
        p.childElementCount === 1 &&
        p.firstElementChild &&
        p.firstElementChild.tagName.toLowerCase() === 'img'
      ) {
        return;
      }
      // Skip empty paragraphs
      if (!p.textContent.trim() && !p.querySelector('a, sup')) return;
      textCellContent.push(p);
    });

    // Add the row with exactly two cells, as required
    rows.push([imageCell, textCellContent]);
  });

  // Build the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
