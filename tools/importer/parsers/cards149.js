/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as in the example
  const cells = [['Cards (cards149)']];
  // Get all immediate card elements (each card is a border--margin)
  const cardItems = element.querySelectorAll(':scope .container__item.container__main__element');
  cardItems.forEach((card) => {
    const boxTop = card.querySelector('.box--top');
    if (!boxTop) return; // Defensive: skip if box missing
    const textBlock = boxTop.querySelector('.text.parbase');
    if (!textBlock) return;
    // We'll build the text cell as an array of nodes in proper order
    const textCell = [];
    // Heading (h3/h2/h1, export as-is for bold style)
    const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCell.push(heading);
    // Find all paragraphs (but skip empty and those inside heading)
    // Only want meaningful paragraphs, in doc order, after heading
    let afterHeading = false;
    for (const child of textBlock.children) {
      if (child === heading) {
        afterHeading = true;
        continue;
      }
      if (
        child.tagName.toLowerCase() === 'p' &&
        child.textContent.trim() !== ''
      ) {
        textCell.push(child);
      }
    }
    // This design has no images or icons, so first cell is empty
    cells.push(['', textCell]);
  });
  // Create block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
