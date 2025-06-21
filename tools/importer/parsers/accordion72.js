/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Accordion (accordion72)'];
  const rows = [headerRow];

  // 2. Find all accordion items (each .expandablecontainer > .accordion)
  // We want only the direct children so we don't pick nested ones multiple times
  const items = Array.from(element.querySelectorAll('.expandablecontainer > .accordion'));

  items.forEach((accordion) => {
    // TITLE CELL
    let titleCell;
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // Usually h2.beta, but if not, fallback to first h2/h3 or the trigger itself
      let titleHeading = trigger.querySelector('h2, h3');
      if (titleHeading) {
        titleCell = titleHeading;
      } else {
        // fallback: use trigger's text
        const div = document.createElement('div');
        div.textContent = trigger.textContent.trim();
        titleCell = div;
      }
    } else {
      // fallback: empty string
      titleCell = document.createTextNode('');
    }

    // CONTENT CELL
    let contentCell;
    const content = accordion.querySelector('.accordion__content');
    if (content) {
      // If only one child and it's not empty, just use that
      const children = Array.from(content.childNodes).filter(n => 
        !(n.nodeType === Node.TEXT_NODE && n.textContent.trim() === '')
      );
      if (children.length === 0) {
        contentCell = document.createTextNode('');
      } else if (children.length === 1) {
        contentCell = children[0];
      } else {
        contentCell = children;
      }
    } else {
      contentCell = document.createTextNode('');
    }

    rows.push([titleCell, contentCell]);
  });

  // 3. Replace the element with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
