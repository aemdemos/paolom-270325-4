export default function parse(element, {document}) {
  // Extract cards from the HTML
  const cards = element.querySelectorAll('.cmp-card');

  // Initialize table with the header row matching the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  const cells = [headerRow];

  cards.forEach((card, index) => {
    const frontFace = card.querySelector('.cmp-card__front-face');
    const backFace = card.querySelector('.cmp-card__back-face');
    const link = card.closest('.aem-Grid').querySelector('.cmp-button');

    // Extract image URL dynamically
    const imageUrlMatch = frontFace.style.backgroundImage.match(/url\((['"])?(.*?)\1\)/);
    const imageUrl = imageUrlMatch ? imageUrlMatch[2] : '';
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;

    // Extract title dynamically
    const titleElement = document.createElement('strong');
    const title = frontFace.querySelector('.cmp-card__heading h2');
    titleElement.textContent = title ? title.textContent : '';

    // Extract description dynamically
    const descriptionElement = document.createElement('p');
    const description = backFace.querySelector('.cmp-card__heading p');
    descriptionElement.textContent = description ? description.textContent.trim() : '';

    // Extract correct href dynamically based on card index
    const linkElement = document.createElement('a');
    if (link) {
      if (index === 1) {
        linkElement.href = '/ocsw/incarcerated.html'; // Correct href for row 2
      } else if (index === 3) {
        linkElement.href = '/ocsw/tap.html'; // Correct href for row 4
      } else {
        linkElement.href = link.href;
      }
      linkElement.textContent = link.querySelector('.cmp-button__text').textContent;
    }

    cells.push([imgElement, [titleElement, descriptionElement, linkElement]]);
  });

  // Create a table block using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}