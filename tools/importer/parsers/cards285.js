/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card elements (immediate children with the correct class)
  const cardNodes = Array.from(
    element.querySelectorAll('.container__items .container__item.container__main__element')
  );

  // Build the table rows
  const rows = [['Cards (cards285)']]; // header row

  cardNodes.forEach(card => {
    // For each card, extract image and text block
    const imageText = card.querySelector('.image-text');
    if (!imageText) return; // skip if not found

    // 1. Image cell (mandatory): first <img> in the card
    let imgElem = imageText.querySelector('img');
    let imageCell = imgElem || document.createTextNode('');

    // 2. Text cell (mandatory):
    // Get the text container
    let textDiv = imageText.querySelector('.text[data-emptytext]');
    let textCellContent = [];
    if (textDiv) {
      // Title: h3/h2/h4
      const heading = textDiv.querySelector('h3, h2, h4');
      if (heading) textCellContent.push(heading);
      // Description: first <p> without <img> and not the CTA
      // Grab all <p> that do NOT contain an <img> and are NOT followed only by a CTA link.
      const allPs = Array.from(textDiv.querySelectorAll('p'));
      const descP = allPs.find(p => !p.querySelector('img') && !p.querySelector('a'));
      if (descP) textCellContent.push(descP);
      // CTA: <a> link (e.g., Learn more)
      const cta = textDiv.querySelector('a');
      if (cta) textCellContent.push(cta);
    }
    let textCell = textCellContent.length > 1 ? textCellContent : textCellContent[0] || document.createTextNode('');
    rows.push([imageCell, textCell]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
