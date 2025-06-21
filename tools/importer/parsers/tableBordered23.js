/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the entire main bordered box content as a block
  // Find the .border.box--white.clearfix element which holds the whole card
  const borderBox = element.querySelector('.border.box--white.clearfix');
  // Fallback: If not found, just use the input element itself
  const contentContainer = borderBox || element;

  // Gather all direct children of the borderBox for semantic grouping
  // This will ensure headings, prose, tables, lists etc. are preserved as in the original
  const content = [];
  Array.from(contentContainer.children).forEach(child => {
    content.push(child);
  });
  // If borderBox had no children, push itself (handles edge case)
  if (content.length === 0) {
    content.push(contentContainer);
  }

  // Create the bordered table block with the correct header
  const cells = [
    ['Table (bordered)'],
    [content]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
