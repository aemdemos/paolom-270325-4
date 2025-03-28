export default function parse(element, {document}) {
  const cards = [];

  const cardElements = element.querySelectorAll('.cmp-card');

  cardElements.forEach((card) => {
    const img = card.querySelector('img');
    const heading = card.querySelector('.cmp-card__heading');
    const content = card.querySelector('.cmp-card--expandable__content');
    const button = card.querySelector('.button .cmp-button');

    // Extract image details dynamically
    const imageElement = img ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = img.src;
      imageElement.alt = img.alt;
    }

    const headingContent = [];

    // Extract name dynamically
    const name = heading.querySelector('p');
    if (name) {
      const nameElement = document.createElement('strong');
      nameElement.textContent = name.textContent.trim();
      headingContent.push(nameElement);
    }

    // Extract title dynamically
    const title = heading.querySelector('h2');
    if (title) {
      const titleElement = document.createElement('p');
      titleElement.textContent = title.textContent.trim();
      headingContent.push(titleElement);
    }

    // Extract description dynamically
    if (content) {
      const descriptionElement = document.createElement('div');
      descriptionElement.innerHTML = content.innerHTML;
      headingContent.push(descriptionElement);
    }

    // Extract button details dynamically
    if (button) {
      const buttonElement = document.createElement('a');
      buttonElement.href = button.getAttribute('aria-label');
      buttonElement.textContent = button.querySelector('.cmp-button__text').textContent.trim();
      headingContent.push(buttonElement);
    }

    // Add card row to the collection
    cards.push([imageElement, headingContent]);
  });

  // Add the header row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  const cells = [headerRow, ...cards];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}