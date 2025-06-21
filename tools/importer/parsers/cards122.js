/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as required
  const cells = [
    ['Cards (cards122)']
  ];

  // Select all card containers
  const cardElems = element.querySelectorAll(':scope .container__item.container__main__element.box--white');

  cardElems.forEach(cardElem => {
    // --- IMAGE COLUMN ---
    let imgElem = null;
    const imgAnchor = cardElem.querySelector('.image a');
    if (imgAnchor) {
      // Find the first <img> inside the anchor (may be nested within a <div>)
      const img = imgAnchor.querySelector('img');
      if (img) imgElem = img;
    }
    // If image missing, leave as null (will render empty cell)

    // --- TEXT COLUMN ---
    // This will include heading, description, and CTA as a single cell
    let textContent = null;
    const textDiv = cardElem.querySelector('.text');
    if (textDiv) {
      textContent = textDiv;
    }
    // If missing, leave as null

    cells.push([imgElem, textContent]);
  });

  // Create the cards block table (no Section Metadata block required)
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
