/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards230) block expects header row, then one row per card: [image, text-content]
  const headerRow = ['Cards (cards230)'];
  const rows = [headerRow];

  // Locate the "main" column containing the card
  const mainCol = element.querySelector('.container__main__element--eight');
  if (!mainCol) {
    return;
  }
  // Only extract .textimage.parbase > .image-text (the card)
  const cardBlock = mainCol.querySelector('.textimage.parbase .image-text');
  if (!cardBlock) {
    return;
  }

  // --- IMAGE/CELL 1 --- //
  let imageCell = '';
  const imageDiv = cardBlock.querySelector('.image');
  if (imageDiv) {
    // Use the first <img> in the imageDiv
    const img = imageDiv.querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // --- TEXT/CELL 2 --- //
  const textCellContent = [];
  const textDiv = cardBlock.querySelector('.text');
  if (textDiv) {
    // Heading/Title
    const heading = textDiv.querySelector('h2, h3, h4, h5, h6');
    if (heading) textCellContent.push(heading);
    // Paragraphs (description and CTA)
    // Only include non-empty <p> tags
    const paragraphs = Array.from(textDiv.querySelectorAll('p')).filter(p => p.textContent.trim());
    paragraphs.forEach(p => textCellContent.push(p));
  }

  // Add card row
  rows.push([imageCell, textCellContent]);

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
