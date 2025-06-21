/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column items
  const columnItems = Array.from(
    element.querySelectorAll('.container__item.container__main__element.box--white')
  );

  const columns = columnItems.map((col) => {
    // The .box--top contains all visible content for the column
    const boxTop = col.querySelector('.box--top');
    if (!boxTop) return document.createTextNode('');
    // The image (if present)
    let imageEl = null;
    const imgContainer = boxTop.querySelector('.image.bg-transparent.image--noborder');
    if (imgContainer) {
      imageEl = imgContainer.querySelector('img');
    }
    // The text content
    const textEl = boxTop.querySelector('.text');
    // Compose column fragment
    const frag = document.createElement('div');
    if (imageEl) {
      frag.appendChild(imageEl);
    }
    if (textEl) {
      while (textEl.childNodes.length) {
        frag.appendChild(textEl.childNodes[0]);
      }
    }
    return frag;
  });

  const headerRow = ['Columns (columns92)'];
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
