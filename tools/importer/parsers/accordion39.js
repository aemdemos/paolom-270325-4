export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extracting block name dynamically
  const blockNameRow = [document.createElement('strong')];
  blockNameRow[0].textContent = 'Accordion';

  // Preparing rows for accordion items
  const rows = Array.from(element.querySelectorAll('.cmp-accordion__item')).map(item => {
    const titleElement = item.querySelector('.cmp-accordion__title');
    const panelElement = item.querySelector('.cmp-accordion__panel');

    // Handle missing or empty data
    const titleCell = document.createElement('div');
    titleCell.textContent = titleElement?.textContent.trim() || 'Untitled';

    const contentCell = document.createElement('div');
    contentCell.innerHTML = panelElement?.innerHTML || '<p>No content available</p>';

    return [titleCell, contentCell];
  });

  const cells = [
    blockNameRow,
    ...rows
  ];

  // Create the table block
  const block = createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(block);
}