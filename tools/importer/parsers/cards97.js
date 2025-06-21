/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main card area
  const cardBox = element.querySelector('.border.box--pale-blue');
  if (!cardBox) return;

  // Find the two columns within the card: left (image), right (text)
  const items = cardBox.querySelectorAll('.container__items');
  if (items.length < 2) return;

  // LEFT CELL: image (first column)
  let imageCell = '';
  const imagePar = items[0].querySelector('.text.parbase');
  if (imagePar) {
    // Look for the first <img> inside this block
    const img = imagePar.querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // RIGHT CELL: heading, description, and CTA (second column)
  const textContainer = items[1].querySelector('.text.parbase');
  const rightCell = [];
  if (textContainer) {
    // Heading: use first h2-h6
    const heading = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) rightCell.push(heading);
    // Get all paragraphs
    const paragraphs = Array.from(textContainer.querySelectorAll('p'));
    // Extract all paragraph elements that have actual text and are not empty
    paragraphs.forEach(p => {
      // If this <p> contains only whitespace or is parent of a link (CTA), handle carefully
      const hasLink = !!p.querySelector('a');
      if (hasLink) {
        // Only add if the link has non-empty text
        if (p.textContent.trim()) {
          rightCell.push(p);
        }
      } else if (p.textContent.trim().length > 0) {
        rightCell.push(p);
      }
    });
  }

  // Compose table: header, then a single row with two cells
  const cells = [
    ['Cards (cards97)'],
    [imageCell, rightCell.length === 1 ? rightCell[0] : rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
