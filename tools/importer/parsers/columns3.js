export default function parse(element, {document}) {
  const imageElement = element.querySelector('.image img');
  const textElement = element.querySelector('.text .cmp-text');

  if (!imageElement || !textElement) {
    throw new Error('Missing required elements in the provided HTML.');
  }

  // Extract image and text content dynamically
  const image = document.createElement('img');
  image.src = imageElement.src || '';
  image.alt = imageElement.alt || '';

  const titleElement = textElement.querySelector('p b');
  const title = document.createElement('p');
  title.textContent = titleElement ? titleElement.textContent.trim() : '';

  const descriptionElement = textElement.querySelector('p:nth-of-type(2)');
  const description = document.createElement('p');
  description.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

  const topicsHeaderElement = textElement.querySelector('p:nth-of-type(3)');
  const topicsHeader = document.createElement('p');
  topicsHeader.textContent = topicsHeaderElement ? topicsHeaderElement.textContent.trim() : '';

  const topicsList = document.createElement('ul');
  const topicItems = textElement.querySelectorAll('ul li');
  topicItems.forEach(liElement => {
    const li = document.createElement('li');
    li.textContent = liElement.textContent.trim();
    topicsList.appendChild(li);
  });

  // Dynamically extract and ensure header matches example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [image, [title, description, topicsHeader, topicsList]]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}