/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match exactly
  const cells = [
    ['Cards (cards266)']
  ];

  // Get the carousel stage (all cards)
  const cardsContainer = element.querySelector('.compare--cards__section .owl-stage');
  if (!cardsContainer) return;

  // All immediate .owl-item children are card wrappers
  const cardItems = Array.from(cardsContainer.querySelectorAll(':scope > .owl-item'));
  cardItems.forEach((owlItem) => {
    const card = owlItem.querySelector(':scope > .compare--cards__section__column');
    if (!card) return;

    // FIRST CELL: image (or empty string if missing)
    let img = card.querySelector('img');
    let imageCell = img || '';

    // SECOND CELL: all text content - reference existing elements only
    const textCellContent = [];

    // Title (as heading)
    const h2 = card.querySelector('h2');
    if (h2) textCellContent.push(h2);

    // Description (feature--text p)
    const descr = card.querySelector('.feature--text > p');
    if (descr) textCellContent.push(descr);

    // Offer (product-info .offer p) - Important: only the <p>, not the OFFER label icon
    const offerPara = card.querySelector('.product-info .offer p');
    if (offerPara) textCellContent.push(offerPara);

    // CTA (button/link)
    const cta = card.querySelector('.rte-buttons a');
    if (cta) textCellContent.push(cta);

    // Push row with 2 columns as in the example
    cells.push([
      imageCell,
      textCellContent
    ]);
  });

  // Create the block table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
