/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid representing the two columns of the hero
  const splitGrid = element.querySelector('.hero__grid--splitBannerImage');
  if (!splitGrid) return;
  const cols = Array.from(splitGrid.children);
  // Defensive: ensure we have both columns
  if (cols.length < 2) return;

  // LEFT COLUMN: all content (headings, paragraphs, nav, etc)
  // The content is inside the first column's container. Gather all direct children
  let leftContent = [];
  {
    const leftCol = cols[0];
    // Include all non-empty nodes (preserves all text and block content)
    leftContent = Array.from(leftCol.childNodes).filter(node => {
      if (node.nodeType === 3) return node.textContent.trim().length > 0;
      return true;
    });
    if (leftContent.length === 0) leftContent = [leftCol];
  }

  // RIGHT COLUMN: background-image as an <img>
  let rightContent = [];
  {
    const rightCol = cols[1];
    // Look for any descendant with a background-image
    const imgDiv = rightCol.querySelector('[style*="background-image"]');
    let foundImg = false;
    if (imgDiv) {
      // Extract the background-image URL
      const bg = imgDiv.style.backgroundImage;
      const match = bg && bg.match(/url\(["']?(.*?)["']?\)/);
      const imgUrl = match && match[1];
      if (imgUrl) {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = '';
        rightContent = [img];
        foundImg = true;
      }
    }
    // If no background image div, fallback to the entire right col's contents
    if (!foundImg) {
      rightContent = Array.from(rightCol.childNodes).filter(node => {
        if (node.nodeType === 3) return node.textContent.trim().length > 0;
        return true;
      });
      if (rightContent.length === 0) rightContent = [rightCol];
    }
  }

  // Create the block table matching the example (header row, then a single row with 2 columns)
  const headerRow = ['Columns (columns39)'];
  const columnsRow = [leftContent, rightContent];
  const cells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
