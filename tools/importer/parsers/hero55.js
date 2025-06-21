/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header as per the example (must be exactly 'Hero')
  const headerRow = ['Hero'];
  // The second row is always a single empty cell
  const imageRow = [''];

  // For the third row, we must include all text content relevant to the navigation/heading block
  // The example screenshot has: 'ANZ Document Exchange' as the heading
  // The source HTML contains this in <span class="first__heading__text">ANZ Document Exchange</span>
  // Let's extract that content as the main heading (h1) for semantic meaning
  const headingTextEl = element.querySelector('.first__heading__text');
  let contentRow;
  if (headingTextEl && headingTextEl.textContent.trim()) {
    const h1 = document.createElement('h1');
    h1.textContent = headingTextEl.textContent.trim();
    contentRow = [h1];
  } else {
    // Fallback: try to get the most prominent text
    const prominentText = element.textContent.trim();
    contentRow = [prominentText ? prominentText : ''];
  }

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
