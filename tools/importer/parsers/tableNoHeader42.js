/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the example
  const headerRow = ['Table (no header)'];

  // Each direct child <div> is a disclaimer entry, containing a <p> as main content.
  const disclaimerBlocks = element.querySelectorAll(':scope > div');
  const rows = [];
  disclaimerBlocks.forEach((block) => {
    // Find the <p> (the disclaimer text with links & spans)
    const p = block.querySelector('p');
    // Only add non-empty paragraphs
    if (p && p.textContent.trim().length > 0) {
      rows.push([p]);
    }
  });

  // Compose final table cell array
  const cells = [headerRow, ...rows];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
