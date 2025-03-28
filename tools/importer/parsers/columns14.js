export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  const buttonElement = element.querySelector('a');
  if (!buttonElement) return null; // Handle missing button element

  const buttonTextElement = buttonElement.querySelector('.cmp-button__text');
  const buttonText = buttonTextElement ? buttonTextElement.textContent.trim() : 'Button'; // Default fallback text

  const linkUrl = buttonElement.getAttribute('href');

  // Correcting the header row structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Correcting the content row to dynamically extract and display meaningful data
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', linkUrl || '#'); // Handle missing href
  linkElement.textContent = buttonText; // Dynamically show button text inside link

  const cells = [
    headerRow, // Header row
    [
      document.createElement('div'), // Placeholder for content if necessary
      linkElement
    ]
  ];

  const blockTable = createTable(cells, document);

  element.replaceWith(blockTable);
}