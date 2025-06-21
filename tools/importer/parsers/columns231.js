/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content area (dd with all article content)
  const articleParsysTwo = element.querySelector('.article-hub__article-parsys-two');
  let mainContent = null;
  if (articleParsysTwo) {
    const dd = articleParsysTwo.querySelector('.cmp-contentfragment__element-value');
    if (dd) {
      mainContent = dd;
    }
  }

  // Fallback: use the original element if not found
  if (!mainContent) {
    mainContent = element;
  }

  // The block name must match exactly per the example
  const cells = [
    ['Columns (columns231)'],
    [mainContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
