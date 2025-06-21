/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the block spec
  const cells = [['Cards (cards186)']];
  
  // Find all cards (immediate children with .container__item)
  const cardNodes = element.querySelectorAll('.container__item.container__main__element');

  cardNodes.forEach((card) => {
    // Left cell: the card image/icon
    let img = card.querySelector('img') || '';
    
    // Right cell: structured text content
    // Grab the h3 (title)
    const title = card.querySelector('h3');
    // All paragraphs after the image: description + CTA
    let paras = Array.from(card.querySelectorAll('p'));
    // Remove the paragraph that only contains the image
    if (paras[0] && paras[0].querySelector('img')) {
      paras.shift();
    }
    // If the last <p> contains only a CTA, separate it
    let ctaPara = null;
    if (
      paras.length > 0 &&
      paras[paras.length-1].querySelector('a') &&
      paras[paras.length-1].textContent.trim().toLowerCase().includes('learn more')
    ) {
      ctaPara = paras.pop();
    }
    // Assemble right cell: title, description, CTA (in order)
    const rightCellContent = [];
    if (title) rightCellContent.push(title);
    if (paras.length) rightCellContent.push(...paras);
    if (ctaPara) rightCellContent.push(ctaPara);

    cells.push([
      img,
      rightCellContent.length === 1 ? rightCellContent[0] : rightCellContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
