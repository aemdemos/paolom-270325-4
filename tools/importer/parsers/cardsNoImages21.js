/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as specified in the example
  const cells = [
    ['Cards (cardsNoImages21)']
  ];

  // Prepare an array to hold all relevant card content from the provided element
  const cardContent = [];

  // Optional tag (displayed at the top of the card)
  const tag = element.querySelector('.article-list-wrapper__item-tag');
  if (tag && tag.textContent.trim()) {
    cardContent.push(tag);
  }

  // Title (h3 inside a.link)
  const title = element.querySelector('h3');
  if (title && title.textContent.trim()) {
    cardContent.push(title);
  }

  // Description (visible description paragraph)
  const descWrapper = element.querySelector('.article-list-wrapper__item-description');
  if (descWrapper) {
    const descP = descWrapper.querySelector('p');
    if (descP && descP.textContent.trim()) {
      cardContent.push(descP);
    }
  }

  // Only add the card row if there is actual content
  if (cardContent.length > 0) {
    cells.push([cardContent]);
  }

  // Create the table using the helper and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
