export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extracting content from the element
  const container = element.querySelector('.cmp-teaser');
  if (!container) {
    console.warn('Missing .cmp-teaser container');
    return;
  }

  // Extracting Image
  const imageWrapper = container.querySelector('.cmp-teaser__image picture img');
  const image = imageWrapper ? document.createElement('img') : null;
  if (image) {
    image.src = imageWrapper.src;
    image.alt = imageWrapper.alt || '';
    image.title = imageWrapper.title || '';
  }

  // Extracting Title
  const titleWrapper = container.querySelector('.cmp-teaser__title');
  const title = titleWrapper ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleWrapper.textContent.trim();
  }

  // Extracting Description
  const descriptionWrapper = container.querySelector('.cmp-teaser__description p');
  const description = descriptionWrapper ? document.createElement('p') : null;
  if (description) {
    description.innerHTML = descriptionWrapper.innerHTML;
  }

  // Creating Header Row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Creating Cells for the Table
  const contentRow = [image, title, description];

  const cells = [
    headerRow,
    contentRow
  ];

  // Creating the block table
  const blockTable = createTable(cells, document);

  // Replacing original element with the new block table
  element.replaceWith(blockTable);
}