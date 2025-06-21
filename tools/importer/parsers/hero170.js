/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero image (background image)
  let img = null;
  // Try to get the first visible img in the '.image' container
  const imageContainers = element.querySelectorAll('.image img');
  if (imageContainers.length > 0) {
    img = imageContainers[0];
  } else {
    // Fallback: any img in the block
    img = element.querySelector('img');
  }

  // 2. Find the heading (title), prefer h2, fallback to h1, fallback to any heading
  let heading = null;
  heading = element.querySelector('.column-heading h2, h2, h1, .column-heading h1');
  // 3. Compose the rest of the hero content: headings and description paragraphs
  // Find the main text content in the .text
  let heroContent = [];
  const textContainer = element.querySelector('.textimage .text');
  if (heading) heroContent.push(heading);
  if (textContainer) {
    // Remove empty paragraphs
    const paragraphs = Array.from(textContainer.querySelectorAll('p'));
    paragraphs.forEach(p => {
      if (!p.textContent.trim()) p.remove();
    });
    // Add all text content except empty
    if (textContainer.childNodes.length > 0) {
      heroContent.push(...Array.from(textContainer.childNodes).filter(n => n.textContent && n.textContent.trim() !== ''));
    }
  }

  // If there is no heading and no text, leave the last cell empty
  if (heroContent.length === 0) heroContent = [''];

  // 4. Build the table as per the example: 1 column, 3 rows
  // Row 1: block type header (exactly 'Hero')
  // Row 2: background image (may be empty)
  // Row 3: heading and text (may be empty)
  const rows = [];
  rows.push(['Hero']);
  rows.push([img ? img : '']);
  rows.push([heroContent.length === 1 ? heroContent[0] : heroContent]);

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
