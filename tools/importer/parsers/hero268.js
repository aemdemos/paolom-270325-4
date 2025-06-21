/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get the image from the left/content area (if any)
  let imageEl = null;
  const image = element.querySelector('.container__main img');
  if (image) {
    imageEl = image;
  }

  // 2. Get the content on the right/asides: heading, text, CTA
  let contentCell = [];
  const asideText = element.querySelector('.container__aside .text');
  if (asideText) {
    const nodes = Array.from(asideText.childNodes).filter(n => {
      // Remove empty text nodes
      return n.nodeType !== Node.TEXT_NODE || n.textContent.trim().length > 0;
    });
    if (nodes.length > 0) {
      contentCell = nodes;
    }
  }

  // 3. Build the table as per the markdown example:
  // Row 1: Header ['Hero']
  // Row 2: Image
  // Row 3: Heading, subheading, CTA (all in one cell, keep existing structure)
  const table = WebImporter.DOMUtils.createTable([
    ['Hero'],
    [imageEl ? imageEl : ''],
    [contentCell.length ? contentCell : '']
  ], document);

  // No Section Metadata block in this example, do not add <hr> or metadata table.

  element.replaceWith(table);
}
