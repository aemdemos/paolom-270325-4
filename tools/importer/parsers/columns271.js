/* global WebImporter */
export default function parse(element, { document }) {
  // Get both columns
  const contentContainer = element.querySelector('.hero__content--container');
  let leftCol = null;
  let rightCol = null;
  if (contentContainer) {
    leftCol = contentContainer.querySelector('.hero__columnContent');
    rightCol = contentContainer.querySelector('.hero__columnImage');
  }

  // Prepare left column cell
  const leftCell = leftCol || document.createElement('div');

  // Prepare right column cell: convert background-image to <img>
  let rightCell = document.createElement('div');
  if (rightCol) {
    const bgDiv = rightCol.querySelector('.hero__image');
    if (bgDiv && bgDiv.style.backgroundImage) {
      const urlMatch = bgDiv.style.backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
      if (urlMatch && urlMatch[2]) {
        const img = document.createElement('img');
        img.src = urlMatch[2];
        img.alt = '';
        rightCell = img;
      }
    }
  }

  // Manually create the table to control colspan on header
  const table = document.createElement('table');

  // Header row with colspan=2
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('colspan', '2');
  th.textContent = 'Columns (columns271)';
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Content row
  const trContent = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.append(leftCell);
  td2.append(rightCell);
  trContent.appendChild(td1);
  trContent.appendChild(td2);
  table.appendChild(trContent);

  // Replace original element with the table
  element.replaceWith(table);
}
