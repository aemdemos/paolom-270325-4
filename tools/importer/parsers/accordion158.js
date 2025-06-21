/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all accordion items within the table
  function getAccordionRows() {
    // Find the main column that contains the accordions
    const mainCol = element.querySelector('.container__main');
    if (!mainCol) return [];
    // Find all .accordion elements, in the correct order
    // They are usually nested inside .accordion-group > .expandablecontainer > .accordion or just .expandablecontainer > .accordion
    const accordionList = [];
    // 1. Try to find groups
    const accordionGroups = mainCol.querySelectorAll('.accordion-group');
    if (accordionGroups.length > 0) {
      accordionGroups.forEach(group => {
        // Inside group: each .expandablecontainer > .accordion
        group.querySelectorAll('.expandablecontainer > .accordion').forEach(acc => accordionList.push(acc));
      });
    } else {
      // Fallback: direct child .expandablecontainer > .accordion
      mainCol.querySelectorAll('.expandablecontainer > .accordion').forEach(acc => accordionList.push(acc));
    }
    return accordionList;
  }
  // Compose rows for block table
  const rows = [];
  // Table header must match example exactly
  rows.push(['Accordion (accordion158)']);
  // For each accordion item, extract the title and content as elements
  const accordionItems = getAccordionRows();
  accordionItems.forEach(acc => {
    // Title: find .accordion__trigger h3.delta as the label
    let titleEl = null;
    const trigger = acc.querySelector('.accordion__trigger');
    if (trigger) {
      // h3.delta inside trigger
      const h3 = trigger.querySelector('h3.delta');
      if (h3) {
        // Remove icon span if present
        const h3Copy = h3.cloneNode(true);
        Array.from(h3Copy.querySelectorAll('span.icon')).forEach(span => span.remove());
        // If h3 contains a link with a nested h3, flatten it (rare)
        const aWithH3 = h3Copy.querySelector('a > h3');
        if (aWithH3) {
          aWithH3.replaceWith(document.createTextNode(aWithH3.textContent));
        }
        titleEl = h3Copy;
      }
    }
    // Content: all children of .accordion__content
    let contentCell;
    const content = acc.querySelector('.accordion__content');
    if (content) {
      // If only one child, use that; if many, use array; if no children, use content element
      const kids = Array.from(content.children);
      if (kids.length === 0) {
        // fallback: empty div, ignore or push empty string
        contentCell = '';
      } else if (kids.length === 1) {
        contentCell = kids[0];
      } else {
        contentCell = kids;
      }
    } else {
      contentCell = '';
    }
    if (titleEl) {
      rows.push([titleEl, contentCell]);
    }
  });
  // Replace the original element with the new block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
