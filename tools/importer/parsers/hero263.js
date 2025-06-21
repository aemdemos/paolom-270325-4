/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image (optional)
  let imageEl = null;
  const img = element.querySelector('.image img');
  if (img) {
    imageEl = img;
  }
  
  // Extract content (heading, subheading, cta, etc.)
  let contentEl = null;
  const aside = element.querySelector('.container__aside');
  if (aside) {
    // The text (with heading, p and cta) is inside .box--top > .text
    const text = aside.querySelector('.box--top > .text');
    if (text) {
      contentEl = text;
    }
  }
  
  // Build the rows as per the example: header, image, text
  const rows = [];
  rows.push(['Hero']);
  rows.push([imageEl ? imageEl : '']);
  rows.push([contentEl ? contentEl : '']);
  
  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  
  // Replace element with block table
  element.replaceWith(table);
}
