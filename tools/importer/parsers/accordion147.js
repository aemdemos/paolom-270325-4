/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block table rows: header, then one row per accordion item
  const cells = [['Accordion (accordion147)']];

  // Find all immediate .expandablecontainer children that contain an .accordion
  // There may be an .accordion-group wrapper, so handle both cases
  let accordionContainers = [];
  if (element.classList.contains('accordion-group')) {
    // Element is the group, find all its direct .expandablecontainer children
    accordionContainers = Array.from(element.querySelectorAll(':scope > .expandablecontainer'));
  } else if (element.querySelector('.accordion-group')) {
    // Element contains a group, use its children
    accordionContainers = Array.from(element.querySelectorAll(':scope > .accordion-group > .expandablecontainer'));
  } else {
    // Fallback: find direct .expandablecontainer children
    accordionContainers = Array.from(element.querySelectorAll(':scope > .expandablecontainer'));
  }

  // If none found, fallback: check if the element itself is a single container
  if (accordionContainers.length === 0 && element.classList.contains('expandablecontainer')) {
    accordionContainers = [element];
  }

  accordionContainers.forEach((container) => {
    // Each container contains an .accordion
    const accordion = container.querySelector(':scope > .accordion');
    if (!accordion) return;

    // Title: look for .accordion__trigger, and use the innermost h3 in the title region
    let titleEl = null;
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // Handle nested h3s (sometimes there is an a > h3)
      let h3s = trigger.querySelectorAll('h3');
      if (h3s.length > 0) {
        // Use the deepest h3
        titleEl = h3s[h3s.length - 1];
      }
    }
    let titleContent = '';
    if (titleEl) {
      titleContent = titleEl.textContent.trim();
    }

    // Content: look for .accordion__content
    let contentEl = accordion.querySelector('.accordion__content');
    let contentCell = '';
    if (contentEl) {
      // Use the first child of accordion__content if it's a .text.parbase, else the content itself
      const mainBlock = contentEl.querySelector('.text.parbase') || contentEl;
      contentCell = mainBlock;
    }

    // Only add a row if both title and content are present
    if (titleContent && contentCell) {
      cells.push([titleContent, contentCell]);
    }
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
