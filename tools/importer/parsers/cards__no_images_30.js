export default function parse(element, {document}) {
  // Extract relevant content
  const imageContainer = element.querySelector('.cmp-event-page__image img');
  const subHeadingContainer = element.querySelector('.cmp-event-page__sub-heading h3');
  const descriptionContainer = element.querySelector('.cmp-event-page__text span');

  // Prepare table rows
  const rows = [];

  // Add header row for block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Add content row
  const contentRow = [];

  if (subHeadingContainer) {
    const headingElement = document.createElement('h3');
    headingElement.textContent = subHeadingContainer.textContent;
    contentRow.push(headingElement);
  }

  if (descriptionContainer) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = descriptionContainer.textContent;
    contentRow.push(descriptionElement);
  }

  rows.push([contentRow]);

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}