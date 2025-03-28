export default function parse(element, {document}) {
  // Extract the original table from the element
  const originalTable = element.querySelector('table');

  // Create a header row for the new table block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (striped & bordered)';
  const headerRow = [headerCell];

  // Extract rows and cells from the original table
  const rows = Array.from(originalTable.querySelectorAll('tr')).map(row => {
    return Array.from(row.querySelectorAll('td, th')).map(cell => {
      // If the cell is empty (contains only &nbsp;), return an empty string
      if (cell.textContent.trim() === '' || cell.textContent.trim() === '\u00a0') {
        return '';
      }
      return cell.textContent.trim();
    });
  });

  // Remove empty rows (if all cells in a row are empty)
  const filteredRows = rows.filter(row => row.some(cell => cell !== ''));

  // Combine the header row and the extracted rows
  const cells = [headerRow, ...filteredRows];

  // Create a new table block using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}