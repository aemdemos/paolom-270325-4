/* global WebImporter */
export default function parse(element, { document }) {
  // The block header: single column exactly as example
  const rows = [['Cards (cards105)']];

  // Find each card container
  const cardElements = element.querySelectorAll('.container__item');

  cardElements.forEach(cardEl => {
    // The text block inside each card
    const text = cardEl.querySelector('.text.parbase');
    if (text) {
      // Reference all children (headings, paragraphs, CTAs)
      const content = document.createElement('div');
      Array.from(text.children).forEach(child => {
        // Only include non-empty elements
        if (child.textContent && child.textContent.trim() !== '') {
          content.appendChild(child);
        }
      });
      // Only add row if any content present
      if (content.childNodes.length > 0) {
        rows.push([content]);
      }
    }
  });

  /**
   * Structure: each row is a single column (like the example, with one card per row)
   * All text content is included by referencing the .text.parbase children directly
   */
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
