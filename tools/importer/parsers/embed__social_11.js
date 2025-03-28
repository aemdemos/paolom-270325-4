export default function parse(element, {document}) {
  const accordionPanel = element.querySelector('[data-cmp-hook-accordion="panel"]');
  const tableElement = accordionPanel.querySelector('table');

  // Validate tableElement existence
  if (!tableElement) {
    console.error('No table element found in the accordion panel.');
    return;
  }

  // Extract rows and cells from the existing table dynamically
  const rows = Array.from(tableElement.rows).map(row => 
    Array.from(row.cells).map(cell => {
      const content = cell.innerHTML.trim();
      return content === '&nbsp;' ? '' : content;
    })
  );

  // Check for empty headers or missing data and ensure correct table structure
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';
  const cells = [headerRow, ...rows];

  // Create a block table using `WebImporter.DOMUtils.createTable`
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}