/* global WebImporter */
export default function parse(element, { document }) {
  // Get the direct children columns
  const colItems = Array.from(
    element.querySelectorAll('.container__item.container__main__element')
  );

  // Each column content: extract the most relevant block, referencing existing elements
  const columns = colItems.map((col) => {
    // Look for the main content wrapper
    const textImage = col.querySelector('.textimage');
    if (!textImage) return col; // fallback to whole col if structure is unexpected
    const imageText = textImage.querySelector('.image-text');
    if (!imageText) return textImage;
    const textDiv = imageText.querySelector('.text');
    if (!textDiv) return imageText;
    // The actual content (image + headings + text) is inside the inner div in .text
    const contentBlocks = [];
    // The .text can have a div wrapper or direct children, so handle both
    const mainContentDiv = textDiv.querySelector('div');
    if (mainContentDiv) {
      // Include all children except empty <p>&nbsp;</p>
      Array.from(mainContentDiv.childNodes).forEach((node) => {
        if (
          node.nodeType === 1 && // element
          !(node.tagName === 'P' && node.innerHTML.trim() === '&nbsp;')
        ) {
          contentBlocks.push(node);
        }
      });
    } else {
      Array.from(textDiv.childNodes).forEach((node) => {
        if (
          node.nodeType === 1 && // element
          !(node.tagName === 'P' && node.innerHTML.trim() === '&nbsp;')
        ) {
          contentBlocks.push(node);
        }
      });
    }
    // If nothing found, fallback to the best parent
    if (contentBlocks.length === 0) {
      return mainContentDiv || textDiv;
    }
    return contentBlocks;
  });

  // Table: header, then one row with one cell per column
  const cells = [
    ['Columns (columns261)'],
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
