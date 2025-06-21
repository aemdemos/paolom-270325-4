/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as in the example
  const rows = [['Cards (cards183)']];

  // Find all card containers
  const cardEls = element.querySelectorAll('.container__item.container__main__element');

  cardEls.forEach(cardEl => {
    // In each card, the image will be within the first .box--top > .text.parbase > p > img
    const boxTop = cardEl.querySelector('.box--top');
    let imgEl = null;
    let imgContainer = null;
    if (boxTop) {
      // find the first image
      const imgCandidate = boxTop.querySelector('img');
      if (imgCandidate) {
        imgEl = imgCandidate;
        // use the <p> containing the image for spacing if available
        imgContainer = imgEl.closest('p') || imgEl;
      }
    }

    // Get the text content for the right cell.
    // Normally, the second .text.parbase inside .box--top has the main content (heading, description, CTA, etc)
    const parbases = boxTop ? boxTop.querySelectorAll('.text.parbase') : [];
    let contentBlock = null;
    // If there are two .text.parbase, the second one is the right content. If only one, use it.
    if (parbases.length > 1) {
      contentBlock = parbases[1];
    } else if (parbases.length === 1) {
      contentBlock = parbases[0];
    }
    // Gather children elements with real content for the right cell
    const rightCellContent = [];
    if (contentBlock) {
      Array.from(contentBlock.childNodes).forEach(child => {
        if (child.nodeType === 1) { // element
          // Exclude empty <p> or <br> used for spacing
          if (child.tagName === 'P' && !child.textContent.trim() && child.querySelectorAll('img').length === 0) {
            return;
          }
          if (child.tagName === 'BR') {
            return;
          }
          rightCellContent.push(child);
        }
      });
    }

    // Add this card's row, referencing existing elements only
    rows.push([
      imgContainer,
      rightCellContent
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
