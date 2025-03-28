export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract the carousel items
  const carouselItems = element.querySelectorAll('.cmp-carousel__item');

  if (!carouselItems || carouselItems.length === 0) {
    return;
  }

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const columns = Array.from(carouselItems).map((item) => {
    const image = item.querySelector('img');
    const titleLink = item.querySelector('.cmp-teaser__title-link');
    const description = item.querySelector('.cmp-teaser__description p');

    const imgElement = document.createElement('img');
    if (image) {
      imgElement.src = image.src;
      imgElement.alt = image.alt;
    }

    const titleElement = document.createElement('h2');
    if (titleLink) {
      const titleText = document.createTextNode(titleLink.textContent);
      titleElement.appendChild(titleText);
    }

    const descriptionElement = document.createElement('p');
    if (description) {
      descriptionElement.innerHTML = description.innerHTML;
    }

    return [imgElement, titleElement, descriptionElement];
  });

  // Create the table structure
  const cells = [
    headerRow,
    ...columns,
  ];

  const blockTable = createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}