export default function parse(element, {document}) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract image
  const img = element.querySelector('img');
  const image = img ? document.createElement('img') : null;
  if (img) {
    image.src = img.src;
    image.alt = img.alt;
  }

  // Extract heading and title
  const heading = element.querySelector('.cmp-card__heading h2')?.textContent.trim() || '';
  const title = document.createElement('strong');
  title.textContent = heading;

  const name = element.querySelector('.cmp-card__heading p')?.textContent.trim() || '';
  const nameParagraph = document.createElement('p');
  nameParagraph.textContent = name;

  // Extract button
  const buttonLink = element.querySelector('.cmp-button');
  const buttonElement = document.createElement('a');
  if (buttonLink) {
    buttonElement.href = buttonLink.getAttribute('href') || '#';
    buttonElement.textContent = buttonLink.querySelector('.cmp-button__text')?.textContent.trim() || '';
  }

  // Create cells array with exact header and content rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const cells = [[headerCell], [image, [nameParagraph, title, buttonElement]]];

  // Create table
  const block = createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}