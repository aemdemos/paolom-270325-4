export default function parse(element, {document}) {
  const urlElement = element.querySelector('.search-bar .cmp-agency-header__search button[data-search-results-path]');
  const url = urlElement ? urlElement.getAttribute('data-search-results-path') : '';

  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Search';

  // Create the content row
  const link = document.createElement('a');
  if (url) {
    link.href = url;
    link.textContent = url;
  } else {
    link.textContent = 'No URL available';
  }
  const contentRow = [link];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}