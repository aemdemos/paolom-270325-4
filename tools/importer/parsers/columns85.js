/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as in the example
  const headerRow = ['Columns (columns85)'];

  // 2. Get the two columns: left = content, right = image
  // The structure is:
  // <div class="hero__grid hero__grid--splitBannerImage clearfix">
  //   <div class="hero__content--container">
  //     <div class="hero__columnContent hero__columnContent--withImage">...</div>
  //     <div class="hero__columnImage">...</div>
  //   </div>
  // </div>
  // Sometimes the container may directly have the two columns
  let leftCell = '';
  let rightCell = '';

  // Find hero__columnContent (left)
  const contentCol = element.querySelector('.hero__columnContent');
  if (contentCol) {
    // The main content sits within .hero__contentRow
    const contentRow = contentCol.querySelector('.hero__contentRow');
    if (contentRow) {
      leftCell = contentRow;
    } else {
      leftCell = contentCol;
    }
  }

  // Find hero__columnImage (right)
  const imageCol = element.querySelector('.hero__columnImage');
  if (imageCol) {
    // The actual image is set as background-image in .hero__image
    const bgDiv = imageCol.querySelector('.hero__image');
    if (bgDiv) {
      const style = bgDiv.getAttribute('style') || '';
      const bgUrlMatch = style.match(/background-image:\s*url\(([^)]+)\)/);
      if (bgUrlMatch) {
        const src = bgUrlMatch[1].replace(/^['"]|['"]$/g, '');
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        rightCell = img;
      }
    }
  }

  // Always ensure both left and right cells exist (even if empty string)

  // 3. Build the block table (two columns)
  const cells = [headerRow, [leftCell, rightCell]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // 4. Replace the original element with the new table
  element.replaceWith(table);
}
