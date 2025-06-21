/* global WebImporter */
export default function parse(element, { document }) {
  // Find grid container
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find the footer tertiary links and text
  const tertiaryLinks = grid.querySelector('.footer__tertiarylinks');
  const tertiaryText = grid.querySelector('.footer__tertiarytext');

  // Defensive: if neither present, do nothing
  if (!tertiaryLinks && !tertiaryText) return;

  // Get the country picker (svg + country text)
  let countryPicker = null;
  if (tertiaryLinks) {
    countryPicker = tertiaryLinks.querySelector('.countrypicker');
  }

  // Get the links list (<ul>...)
  let linksList = null;
  if (tertiaryLinks) {
    linksList = tertiaryLinks.querySelector('ul.tertiarylinks__list');
  }

  // Get the copyright text (<p>...)
  let copyright = null;
  if (tertiaryText) {
    copyright = tertiaryText.querySelector('p');
  }

  // Compose the right cell content (links list and copyright)
  const rightCell = [];
  if (linksList) rightCell.push(linksList);
  if (copyright) rightCell.push(copyright);

  // Compose the left cell content (country picker)
  const leftCell = [];
  if (countryPicker) leftCell.push(countryPicker);

  // Build table cells
  const cells = [];
  // Header row must match exactly
  cells.push(['Cards (cards38)']);
  // Only add a row if there is at least some content
  if (leftCell.length || rightCell.length) {
    cells.push([leftCell, rightCell]);
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
