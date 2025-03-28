export default function parse(element, {document}) {
  // Helper function to create a search table
  const createSearchTable = (url) => {
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Search';
    const headerRow = [headerCell];

    return WebImporter.DOMUtils.createTable([
      headerRow,
      [url ? document.createTextNode(url) : document.createTextNode('No URL available')],
    ], document);
  };

  // Extract the API URL for the query index
  const queryIndexUrl = element.querySelector('.newslist__filter-template')?.getAttribute('data-newslistingapiurl');

  let absoluteUrl = null;
  if (queryIndexUrl) {
    try {
      // Ensure the URL is properly converted to absolute format
      absoluteUrl = new URL(queryIndexUrl, document.location.origin).href;
    } catch (e) {
      console.error('Invalid URL:', queryIndexUrl);
    }
  }

  // Create the search block table
  const searchTable = createSearchTable(absoluteUrl);

  // Replace the original element with the created table
  element.replaceWith(searchTable);
}