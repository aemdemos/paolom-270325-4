/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const headerRow = ['Cards (cards95)'];
  const rows = [headerRow];

  // Select all card containers (immediate children)
  const cardContainers = element.querySelectorAll(':scope .container__item');

  cardContainers.forEach(card => {
    // There are no images/icons in this variant, so first cell is empty
    const firstCell = '';
    
    // Text content extraction
    const boxTop = card.querySelector(':scope > .box--top');
    let textCellContent = [];
    if (boxTop) {
      const textBlock = boxTop.querySelector('.text');
      if (textBlock) {
        // Find all headings (typically h2), then the first paragraph
        const headings = textBlock.querySelectorAll('h2');
        headings.forEach(h => textCellContent.push(h));
        // Description paragraph
        const desc = textBlock.querySelector('p, .paragraph-text--regular');
        if (desc) textCellContent.push(desc);
      }
    }
    // Fallback in case no headings/paragraphs found
    if (textCellContent.length === 0 && boxTop) {
      textCellContent.push(boxTop);
    }

    rows.push([
      firstCell,
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
