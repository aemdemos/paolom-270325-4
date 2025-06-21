/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER: Must be exactly as instructed
  const headerRow = ['Columns (columns142)'];

  // Locate the container that holds each column item
  let columns = [];
  const itemsContainer = element.querySelector('.container__items');
  if (itemsContainer) {
    columns = Array.from(itemsContainer.querySelectorAll(':scope > .container__item'));
  } else {
    columns = Array.from(element.querySelectorAll(':scope > .container__item'));
  }

  // If there are no columns, don't do anything
  if (!columns.length) return;

  // For each column, reference the .text element (if present), else the whole column
  const contentRow = columns.map(col => {
    const text = col.querySelector(':scope > .text');
    // Defensive: only include if it actually has content
    if (text && text.textContent.trim()) {
      return text;
    }
    // fallback: use the column itself (should not happen here, but covers edge case)
    return col;
  });

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
