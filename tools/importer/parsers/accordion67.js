/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find all accordions
  const accordionEls = Array.from(element.querySelectorAll('.accordion'));
  if (!accordionEls.length) return;

  // Compose header
  const headerRow = ['Accordion (accordion67)'];
  const rows = [headerRow];

  accordionEls.forEach(acc => {
    // Robustly get the title for the accordion (text label)
    let titleEl = null;
    let trigger = acc.querySelector('.accordion__trigger');
    if (trigger) {
      // Prefer heading tags inside
      let heading = trigger.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        titleEl = heading;
      } else {
        // Sometimes heading is inside <a>
        let anchorHeading = trigger.querySelector('a');
        if (anchorHeading && anchorHeading.textContent.trim()) {
          titleEl = anchorHeading;
        } else {
          titleEl = trigger;
        }
      }
    } else {
      // fallback: any heading in the accordion as title
      let heading = acc.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        titleEl = heading;
      } else {
        // fallback: first element
        titleEl = acc.firstElementChild;
      }
    }

    // Content: gather ALL non-trigger children from .accordion__content
    let contentCell = [];
    let content = acc.querySelector('.accordion__content');
    if (content) {
      // If only one child, reference it; if many, reference all; if text, include text
      if (content.children.length === 0) {
        if (content.textContent.trim()) contentCell.push(document.createTextNode(content.textContent));
      } else {
        for (const child of content.childNodes) {
          // Only append non-empty nodes
          if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim())) {
            contentCell.push(child);
          }
        }
      }
    }
    if (contentCell.length === 1) contentCell = contentCell[0];
    if (contentCell.length === 0) contentCell = '';

    rows.push([titleEl, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
