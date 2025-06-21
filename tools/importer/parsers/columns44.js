/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Columns (columns44)'];

  // 2. Get the columns: the hero__columnContent (text) and hero__columnImage (image)
  const container = element.querySelector('.hero__content--container');
  if (!container) return;

  const cols = container.querySelectorAll(':scope > div');
  // Defensive: should be two columns
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Left: get all content rows (should include heading, paragraph, ul)
  let leftCellContent = [];
  if (leftCol) {
    // Actually, the content is inside .hero__contentRow
    const contentRow = leftCol.querySelector('.hero__contentRow');
    if (contentRow) {
      // Grab children in order
      Array.from(contentRow.children).forEach((child) => {
        leftCellContent.push(child);
      });
    } else {
      // Fallback: push all children
      Array.from(leftCol.children).forEach((child) => {
        leftCellContent.push(child);
      });
    }
  }

  // Right: get the image from the background-image style
  let rightCellContent = '';
  if (rightCol) {
    const imageDiv = rightCol.querySelector('.hero__image');
    if (imageDiv && imageDiv.style.backgroundImage) {
      const urlMatch = imageDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        // Optional: use heading as alt if present
        const heading = leftCellContent.find(el => el.tagName && el.tagName.toLowerCase() === 'h1');
        img.alt = heading ? heading.textContent : '';
        rightCellContent = img;
      }
    }
  }

  // Make sure both columns exist, and both cells are arrays/strings/elements as expected
  const row = [leftCellContent.length ? leftCellContent : '', rightCellContent];

  // 3. Build table
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
