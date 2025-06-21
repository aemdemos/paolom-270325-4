/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per example
  const headerRow = ['Columns (columns58)'];

  // Find the `.rowcontainer__row` which contains the columns
  const row = element.querySelector('.rowcontainer__row');
  let columns = [];

  if (row) {
    // For each immediate column
    const columnDivs = Array.from(row.querySelectorAll(':scope > .rowcontainer__column'));
    columns = columnDivs.map(colDiv => {
      // Gather all content in this column, preserving text and structure
      const contentNodes = [];
      for (const node of colDiv.childNodes) {
        // Only push elements or non-empty text nodes
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
          contentNodes.push(node);
        }
      }
      // If the column is empty, return an empty string
      if (contentNodes.length === 0) return '';
      // If only one node, return as is, else as array
      return contentNodes.length === 1 ? contentNodes[0] : contentNodes;
    });
  }

  // If no columns found, fallback to empty columns
  if (!columns.length) columns = [''];

  // Compose the rows for the block table
  const tableRows = [headerRow, columns];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
