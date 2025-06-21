/* global WebImporter */
export default function parse(element, { document }) {
  // Critical Review:
  // - No content hardcoded except the header
  // - No markdown syntax, only HTML DOM
  // - Only one block table to be created (no Section Metadata in the markdown example)
  // - Header matches: 'Columns (columns27)'
  // - Handles missing/empty elements by checking for tabList
  // - All elements referenced from DOM, not cloned

  // 1. Find the tablist containing the 'columns'
  const tabList = element.querySelector('ul[role="tablist"]');
  if (!tabList) return;
  const tabItems = Array.from(tabList.querySelectorAll(':scope > li'));

  // 2. Extract the immediate content containers for each column
  const columns = tabItems.map(li => {
    // Get the content wrapper (usually a div inside li)
    let container = li.querySelector(':scope > div');
    if (!container) container = li; // fallback if structure changes
    return container;
  });

  // 3. Build the table: header row, then content row with columns
  const cells = [
    ['Columns (columns27)'],
    columns
  ];

  // 4. Create table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
