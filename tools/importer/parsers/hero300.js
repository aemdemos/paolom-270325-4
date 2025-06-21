/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the table, exactly as in the example
  const headerRow = ['Hero'];

  // In the example, the second row is for a background image, which is not present in the given HTML.
  // So, the second row is a single empty cell.
  const imageRow = [''];

  // The third row should contain the block's main content.
  // In the provided HTML, there are two disclaimer <div>s, each with a paragraph.
  // We'll put each paragraph in order, separated by <br> just like in the source HTML rendering.
  // The 'Return' links are navigational and are not part of the disclaimer content. So we skip them.
  const disclaimerDivs = Array.from(element.querySelectorAll(':scope > div'));
  const parts = [];
  disclaimerDivs.forEach((div, idx) => {
    // Find the first <p> for disclaimer content
    const para = div.querySelector('p');
    if (para) {
      parts.push(para);
    }
    // If more than one, add <br> between
    if (idx < disclaimerDivs.length - 1) {
      parts.push(document.createElement('br'));
    }
  });
  // If nothing found for the content, leave blank cell.
  const contentRow = [parts.length > 0 ? parts : ''];

  // Build the table as per the markdown example: 1 column, 3 rows.
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
