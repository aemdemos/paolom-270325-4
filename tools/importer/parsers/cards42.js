export default function parse(element, {document}) {
  // Extract relevant content from the input element
  const imageEl = element.querySelector('.cmp-teaser__image img');
  const titleEl = element.querySelector('.cmp-teaser__title a');
  const descriptionEl = element.querySelector('.cmp-teaser__description p');

  // Create the cells data for the table
  const cells = [
    [(() => {
      const headerCell = document.createElement('strong');
      headerCell.textContent = 'Cards';
      return headerCell;
    })()], // Header row indicating block type
    [
      imageEl ? imageEl.cloneNode(true) : '', // Clone the image element for the first column, fallback to empty string if missing
      [
        titleEl ? (() => {
          const title = document.createElement('h2');
          title.textContent = titleEl.textContent;
          return title;
        })() : '', // Handle missing title
        descriptionEl ? (() => {
          const description = document.createElement('p');
          description.textContent = descriptionEl.textContent;
          return description;
        })() : '' // Handle missing description
      ]
    ]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}