export default function parse(element, {document}) {
  const table = element.querySelector('table');
  if (!table) {
    throw new Error('Table not found in the provided element');
  }

  // Extract rows from the table
  const rows = Array.from(table.querySelectorAll('tr'));

  // Validate that the table has a header row
  if (rows.length === 0 || rows[0].querySelectorAll('th').length === 0) {
    throw new Error('Table does not have a valid header row');
  }

  // Extract header row dynamically, ensuring each header is in a separate <th>
  const headerRow = Array.from(rows[0].querySelectorAll('th')).map(cell => {
    const headerCell = document.createElement('strong');
    headerCell.textContent = cell.textContent.trim();
    return headerCell;
  });

  // Extract content rows dynamically
  const contentRows = rows.slice(1).map(row => {
    return Array.from(row.querySelectorAll('td')).map(cell => {
      if (cell.querySelector('a')) {
        return cell.querySelector('a');
      } else {
        const div = document.createElement('div');
        div.innerHTML = cell.innerHTML.trim();
        return div.childNodes.length === 1 ? div.childNodes[0] : Array.from(div.childNodes);
      }
    });
  });

  // Create the table with the corrected header row and extracted content
  const blockTable = WebImporter.DOMUtils.createTable([
    ['Table (striped & bordered)'],
    headerRow,
    ...contentRows
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}