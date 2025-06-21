/* global WebImporter */
export default function parse(element, { document }) {
  // There is only one tab, so we must output a table with a single-column header row,
  // followed by a single content row with two columns: tab label, tab content.

  // Get the inner div with the actual disclaimer content
  const contentDiv = element.querySelector(':scope > div');
  if (!contentDiv) return;

  // Get the disclaimer number, fallback to just 'Disclaimer' if missing
  let tabLabel = 'Disclaimer';
  const disNum = contentDiv.querySelector('.dis-number');
  if (disNum && disNum.textContent) {
    const num = disNum.textContent.replace(/\D/g, '');
    if (num) tabLabel = `Disclaimer ${num}`;
  }

  // Remove the "Return" link if present
  const returnLink = contentDiv.querySelector('.back-to-origin');
  if (returnLink) returnLink.remove();

  // Get the main tab content (prefer the main <p>, fallback to the whole contentDiv)
  const tabContent = contentDiv.querySelector('p.rte--body3-regular') || contentDiv.querySelector('p') || contentDiv;

  // Construct the table data: single header cell, then one row with two cells
  const cells = [
    ['Tabs (tabs35)'],
    [tabLabel, tabContent]
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
