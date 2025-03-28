export default function parse(element, {document}) {
  // Helper function to create table
  const createTable = WebImporter.DOMUtils.createTable;

  // Initialize cards array
  const cards = [];

  // Check if the element contains newsfeed list
  const newsListWrapper = element.querySelector('.newsfeed__list');
  if (newsListWrapper) {
    const imageAnchor = newsListWrapper.querySelector('.newsfeed__image img');
    const titleAnchor = newsListWrapper.querySelector('.newsfeed__title a');
    const caption = newsListWrapper.querySelector('.caption');

    // Create image element or fallback to null
    const image = document.createElement('img');
    if (imageAnchor) {
      image.src = imageAnchor.src;
      image.alt = imageAnchor.alt;
    } else {
      image.src = '';
      image.alt = '';
    }

    // Create title element
    const title = document.createElement('h2');
    if (titleAnchor) {
      const titleLink = document.createElement('a');
      titleLink.href = titleAnchor.href;
      titleLink.textContent = titleAnchor.textContent.trim();
      title.appendChild(titleLink);
    }

    // Create description element
    const description = document.createElement('div');
    if (caption) {
      description.textContent = caption.textContent.trim();
    }

    // Combine content into a single cell
    const contentCell = [title, description];
    cards.push([image, contentCell]);
  }

  // Add "Full Newsroom" link if available
  const moreLinkWrapper = element.querySelector('.newsfeed__more a');
  if (moreLinkWrapper) {
    const moreLink = document.createElement('a');
    moreLink.href = moreLinkWrapper.href;
    moreLink.textContent = moreLinkWrapper.textContent.trim();
    cards.push([null, moreLink]);
  }

  // Prepare header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];

  // Create cells array with header and cards
  const cells = [
    headerRow,
    ...cards
  ];

  // Create table and replace original element
  const table = createTable(cells, document);
  element.replaceWith(table);
}