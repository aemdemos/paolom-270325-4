export default function parse(element, {document}) {
  const blockName = document.createElement('strong');
  blockName.textContent = 'Hero';

  const image = element.querySelector('.cmp-teaser__image img');
  const heading = element.querySelector('.cmp-title__text');
  const text = element.querySelector('.cmp-text');
  const button = element.querySelector('.cmp-button');
  const lastModified = element.querySelector('.cmp-last-modified-date span');

  const contentCells = [];

  if (image) {
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    contentCells.push(imgElement);
  }

  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading.textContent;
    contentCells.push(headingElement);
  }

  if (text) {
    const paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = text.querySelector('p')?.innerHTML || '';
    contentCells.push(paragraphElement);
  }

  if (button) {
    const buttonLink = document.createElement('a');
    buttonLink.href = button.href;
    buttonLink.textContent = button.querySelector('.cmp-button__text')?.textContent || '';
    contentCells.push(buttonLink);
  }

  if (lastModified) {
    const lastModifiedElement = document.createElement('p');
    lastModifiedElement.textContent = `Last Modified on ${lastModified.textContent}`;
    contentCells.push(lastModifiedElement);
  }

  const cells = [
    [blockName],
    contentCells
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);

  return blockTable;
}