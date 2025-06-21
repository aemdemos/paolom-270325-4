/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const rows = [['Cards (cards184)']];

  // Find all direct card elements
  const cardItems = element.querySelectorAll('.container__item.container__main__element');

  cardItems.forEach((card) => {
    // Each card has a .box--top > div > .text.parbase
    const textBlock = card.querySelector('.text.parbase');
    if (!textBlock) return;

    // First img as icon/image (mandatory)
    const img = textBlock.querySelector('img');

    // Find heading (h3), which is used as card title
    const heading = textBlock.querySelector('h3, strong, b');

    // Description: all p excluding the image-only p
    const paragraphs = Array.from(textBlock.querySelectorAll('p'));
    // Identify the p containing the img
    const imgParent = img ? img.closest('p') : null;
    // The rest of the paragraphs are description (may include links or superscripts)
    let descPs = paragraphs.filter(p => p !== imgParent);

    // Remove heading from descPs if it's in a p (avoid duplicate content)
    let titleElem = heading;
    if (heading && heading.parentElement.tagName.toLowerCase() === 'p') {
      descPs = descPs.filter(p => p !== heading.parentElement);
    }

    // Compose text cell: title (as element), followed by each paragraph (as elements)
    const textCellContent = [];
    if (titleElem) textCellContent.push(titleElem);
    descPs.forEach(p => textCellContent.push(p));

    // Add row: first cell is image/icon, second cell is text content
    rows.push([
      img,
      textCellContent
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
