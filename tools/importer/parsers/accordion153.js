/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as required
  const headerRow = ['Accordion (accordion153)'];
  const rows = [headerRow];

  // Find the container that holds the accordion group
  let asideCol = null;
  element.querySelectorAll('.container__items').forEach((col) => {
    if (col.classList.contains('container__aside')) {
      if (col.querySelector('.accordion-group')) asideCol = col;
    }
  });
  if (!asideCol) {
    asideCol = element.querySelector('.accordion-group');
  } else {
    asideCol = asideCol.querySelector('.accordion-group');
  }

  if (asideCol) {
    // Find all direct .expandablecontainer > .accordion in the group
    const panelContainers = Array.from(asideCol.querySelectorAll(':scope > .expandablecontainer')).map(exp => exp.querySelector(':scope > .accordion')).filter(Boolean);
    panelContainers.forEach((accordion) => {
      // Find the heading/title
      let titleElem = null;
      const trigger = accordion.querySelector('.accordion__trigger');
      if (trigger) {
        // It's always the last h3 inside the trigger
        const h3s = trigger.querySelectorAll('h3');
        if (h3s.length > 0) {
          titleElem = h3s[h3s.length - 1];
        } else {
          titleElem = document.createElement('span');
          titleElem.textContent = trigger.textContent.trim();
        }
      } else {
        titleElem = document.createElement('span');
        titleElem.textContent = '';
      }

      // Find the content
      let contentElem = null;
      const content = accordion.querySelector('.accordion__content');
      if (content) {
        if (content.children.length === 1) {
          contentElem = content.firstElementChild;
        } else if (content.children.length > 1) {
          // Wrap multiple children in a div for structure
          contentElem = document.createElement('div');
          Array.from(content.childNodes).forEach((n) => contentElem.appendChild(n));
        } else {
          // Empty content
          contentElem = document.createElement('span');
          contentElem.textContent = '';
        }
      } else {
        contentElem = document.createElement('span');
        contentElem.textContent = '';
      }
      rows.push([titleElem, contentElem]);
    });
  }

  // Replace the original element with the new accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
