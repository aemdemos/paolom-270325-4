/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the component name exactly
  const header = ['Cards (cards244)'];
  // Find all card elements within this block
  const cardElements = element.querySelectorAll(':scope .container__item');
  const rows = [];
  cardElements.forEach((card) => {
    // Find the image
    const img = card.querySelector('.image img');
    // Find the text container
    const text = card.querySelector('.text');
    // Defensive: if either is missing, create a placeholder
    const imageCell = img ? img : '';
    // For text, we want the heading, description, and CTA if present, as a block
    let textCell = '';
    if (text) {
      // Use the .text element as-is, so formatting (heading, paragraphs, links) is preserved
      textCell = text;
    }
    rows.push([imageCell, textCell]);
  });
  // Build table and replace
  const table = WebImporter.DOMUtils.createTable([
    header,
    ...rows
  ], document);
  element.replaceWith(table);
}
