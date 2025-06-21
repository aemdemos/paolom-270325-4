/* global WebImporter */
export default function parse(element, { document }) {
  // Get all cards (each .container__item.container__main__element)
  const cards = Array.from(element.querySelectorAll('.container__item.container__main__element'));
  const rows = [['Cards (cards239)']];

  cards.forEach(card => {
    // Reference the first <img> within this card (always a card image)
    let img = null;
    const imgEl = card.querySelector('.image img');
    if (imgEl) img = imgEl;
    else {
      // fallback: any image
      const imgs = card.getElementsByTagName('img');
      if (imgs.length > 0) img = imgs[0];
    }

    // Reference the text node (h3, p, a), maintaining HTML hierarchy
    const textContainer = card.querySelector('.text');
    const textContent = [];
    if (textContainer) {
      for (const child of Array.from(textContainer.childNodes)) {
        // Only include elements or text nodes with content
        if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim())) {
          textContent.push(child);
        }
      }
    }
    // If everything is missing, fallback to empty cell
    rows.push([
      img || '',
      textContent.length > 0 ? textContent : ''
    ]);
  });
  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
