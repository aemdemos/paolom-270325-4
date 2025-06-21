/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards198) block header
  const cells = [
    ['Cards (cards198)']
  ];

  // Select all immediate card items
  const cardEls = element.querySelectorAll('.container__item');

  cardEls.forEach(cardEl => {
    // Main content usually inside .box--top > div > .text
    const textWrapper = cardEl.querySelector('.box--top > div > .text');
    if (!textWrapper) return;

    // Find number in first h2 > b
    const numH2 = textWrapper.querySelector('h2.alpha');
    let numberNode = null;
    if (numH2 && numH2.firstElementChild) {
      numberNode = numH2.firstElementChild; // usually a <b> element
    }

    // Find icon and title in second h2
    const h2s = textWrapper.querySelectorAll('h2');
    let titleH2 = null, iconNode = null;
    if (h2s.length >= 2) {
      titleH2 = h2s[1];
      // Icon: usually a <span class="icon">
      iconNode = titleH2.querySelector('.icon');
    }

    // Compose icon/number cell: reference original elements
    const iconCellContent = document.createElement('div');
    if (numberNode) iconCellContent.appendChild(numberNode);
    if (iconNode) iconCellContent.appendChild(iconNode);

    // Compose text cell: title (remove icon from h2), then <p>
    const textCellContent = document.createElement('div');
    if (titleH2) {
      // Clone h2, remove all .icon descendants
      const h2Clone = titleH2.cloneNode(true);
      h2Clone.querySelectorAll('.icon').forEach(e => e.remove());
      // Remove empty nodes
      if (h2Clone.textContent.trim()) {
        textCellContent.appendChild(h2Clone);
      }
    }
    // Description <p>
    const descP = textWrapper.querySelector('p');
    if (descP) textCellContent.appendChild(descP);

    // Only push rows that have at least some content
    if (iconCellContent.childNodes.length > 0 || textCellContent.childNodes.length > 0) {
      cells.push([
        iconCellContent,
        textCellContent
      ]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
