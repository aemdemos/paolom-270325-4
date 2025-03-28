export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards (no images)';

  const cells = [headerRow];

  const cardHeading = element.querySelector('.cmp-card__heading h2');
  const cardContent = element.querySelector('.cmp-card__heading ul');

  if (cardHeading && cardContent) {
    const headingElement = document.createElement('h2');
    headingElement.textContent = cardHeading.textContent.trim();

    const listItems = Array.from(cardContent.querySelectorAll('li')).map((li) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = li.innerHTML.trim();
      return paragraph;
    });

    const cardCellContent = [headingElement, ...listItems];
    cells.push([cardCellContent]);
  } else {
    // Handle missing data edge case by adding a placeholder row
    const placeholder = document.createElement('p');
    placeholder.textContent = 'No content available';
    cells.push([placeholder]);
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}