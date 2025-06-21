/* global WebImporter */
export default function parse(element, { document }) {
  // This source HTML does not contain any tab structure or any usable content for a Tabs block.
  // Per block guidelines, create a Tabs (tabs20) block with only the header row, as there is no tab data to extract.
  const cells = [
    ['Tabs (tabs20)']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}