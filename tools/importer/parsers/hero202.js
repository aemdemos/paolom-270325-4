/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract the image used as the hero image
  let imageEl = null;
  const imgDiv = element.querySelector('.image');
  if (imgDiv) {
    // Find the <img> inside .image
    imageEl = imgDiv.querySelector('img');
  }

  // 2. Extract the content (heading, subheading, cta, etc) from the aside/main content
  // We'll use the right column which contains .text
  let contentParts = [];
  const asideContent = element.querySelector('.container__aside .text');
  if (asideContent) {
    // Only include non-empty elements (skip empty paragraphs/divs)
    contentParts = Array.from(asideContent.children).filter(el => {
      if (el.tagName === 'P' && !el.textContent.trim() && !el.querySelector('img')) return false;
      return true;
    });
  }
  // Defensive: if contentParts is empty, put an empty string
  if (contentParts.length === 0) contentParts = [''];

  // Build table structure as per Hero block rules
  const rows = [];
  // Row 1: Table header
  rows.push(['Hero']);
  // Row 2: image (or empty)
  rows.push([imageEl || '']);
  // Row 3: content (heading, subheading, cta, etc)
  rows.push([contentParts]);

  // Create the table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
