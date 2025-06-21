/* global WebImporter */
export default function parse(element, { document }) {
  // Find the heading element (h2 inside the left column), reference it directly
  let heading = null;
  const leftHead = element.querySelector('.column-heading h2');
  if (leftHead) heading = leftHead;
  else heading = element.querySelector('h2, h3, h1');

  // Find the main table (right column), reference it directly
  let table = element.querySelector('table');
  if (!table) return;

  // Remove caption, if present, for cleaner output
  const caption = table.querySelector('caption');
  if (caption) caption.remove();

  // Compose the content cell: heading and table in natural sequence
  const content = [];
  if (heading) content.push(heading);
  content.push(table);

  // Create the block table with proper structure
  const cells = [
    ['Table'],
    [content]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}