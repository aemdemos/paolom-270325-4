/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the main <img> in a potentially messy AEM "picture" structure
  function extractImg(container) {
    // Try to find the <img> in descendants
    let img = container.querySelector('img');
    return img || '';
  }

  // Find all card containers
  const cardEls = element.querySelectorAll('.container__item');
  const rows = [['Cards (cards93)']]; // Header row as in the example

  cardEls.forEach(card => {
    // Extract image cell
    let imgContainer = card.querySelector('.image');
    let imageCell = '';
    if (imgContainer) {
      let img = extractImg(imgContainer);
      if (img) imageCell = img;
    }
    // Extract the text cell contents
    let textContainer = card.querySelector('.text');
    const textParts = [];
    if (textContainer) {
      // Get heading (h3 > a), or h3 if no a
      let h3 = textContainer.querySelector('h3');
      if (h3) {
        let a = h3.querySelector('a');
        if (a) textParts.push(a);
        else textParts.push(h3);
      }
      // Get all paragraphs
      let ps = textContainer.querySelectorAll('p');
      ps.forEach(p => textParts.push(p));
    }
    // If nothing found, leave cell blank
    let textCell = textParts.length > 0 ? textParts : '';
    rows.push([imageCell, textCell]);
  });

  // Build and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
