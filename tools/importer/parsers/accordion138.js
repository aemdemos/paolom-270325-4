/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the accordion block
  const headerRow = ['Accordion (accordion138)'];
  const rows = [headerRow];

  // Identify the aside column containing the accordions
  let asideContent = element.querySelector('.container__aside');
  if (!asideContent) {
    // Fallback: try to find the second .container__items if aside class missing
    const items = element.querySelectorAll('.container__items');
    if (items.length > 1) {
      asideContent = items[1];
    }
  }
  if (!asideContent) {
    // Abort if no aside content found, nothing to build
    return;
  }

  // Find all direct .expandablecontainer > .accordion inside the aside column
  const expandableContainers = asideContent.querySelectorAll('.expandablecontainer');

  expandableContainers.forEach(exp => {
    const accordion = exp.querySelector(':scope > .accordion');
    if (!accordion) return;

    // Get the accordion title (the clickable area) - reference the existing h3 element
    let titleEl = accordion.querySelector('.accordion__trigger h3');
    if (!titleEl) {
      // fallback: take .accordion__trigger itself
      titleEl = accordion.querySelector('.accordion__trigger');
    }
    if (!titleEl) {
      // fallback: first child
      titleEl = accordion.firstElementChild;
    }

    // Get the content element
    let contentEl = accordion.querySelector('.accordion__content');
    if (!contentEl) {
      // fallback: second child
      contentEl = accordion.children[1];
    }

    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Only build the block if we have at least 1 accordion panel
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
