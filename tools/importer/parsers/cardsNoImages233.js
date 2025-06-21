/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Cards (cardsNoImages233)'];
  const rows = [headerRow];

  // Attempt to locate the content for the card
  // The structure has .textimage .text for the actual card content
  const textImage = element.querySelector('.textimage');
  if (textImage) {
    const textContainer = textImage.querySelector('.text');
    if (textContainer) {
      // Gather all the content in .text as is, preserve order and elements
      const cardContent = [];
      Array.from(textContainer.childNodes).forEach(node => {
        // only push elements (like headings, paragraphs, etc.) that contain real content
        if (node.nodeType === 1) {
          // avoid empty paragraphs or elements
          if (node.textContent && node.textContent.trim().length > 0) {
            cardContent.push(node);
          }
        } else if (node.nodeType === 3) {
          // text node, ignore if whitespace only
          if (node.textContent.trim().length > 0) {
            const span = document.createElement('span');
            span.textContent = node.textContent.trim();
            cardContent.push(span);
          }
        }
      });
      if (cardContent.length > 0) {
        rows.push([cardContent]);
      }
    }
  }
  // Only create the table if there is at least the header and one card
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
