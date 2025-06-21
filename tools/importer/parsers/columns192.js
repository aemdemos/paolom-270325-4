/* global WebImporter */
export default function parse(element, { document }) {
  // Get all column elements for the columns block
  const cols = Array.from(element.querySelectorAll(':scope .container__item.container__main__element'));

  // Block header row, must match exactly the block name/variant
  const headerRow = ['Columns (columns192)'];

  // Each column: collect the direct children (as DocumentFragment)
  const contentRow = cols.map((col) => {
    const frag = document.createDocumentFragment();
    Array.from(col.children).forEach(child => {
      frag.appendChild(child);
    });
    return frag;
  });

  // Compose the block table
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
