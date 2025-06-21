/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must be exactly 'Hero'
  const headerRow = ['Hero'];

  // Get the image: find the first <img> inside .image-text .image
  let imageEl = null;
  const imageWrapper = element.querySelector('.image-text .image');
  if (imageWrapper) {
    imageEl = imageWrapper.querySelector('img');
  }

  // Get the text content: all content in .image-text .text
  // This will include heading, paragraphs, and cta
  let textContent = '';
  const textBlock = element.querySelector('.image-text .text');
  if (textBlock) {
    textContent = textBlock;
  }

  // Build the table as in the example: header, image, text
  const cells = [
    headerRow,
    [imageEl || ''],
    [textContent || ''],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
