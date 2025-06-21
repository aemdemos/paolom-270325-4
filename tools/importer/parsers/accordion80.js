/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with exact block name
  const headerRow = ['Accordion (accordion80)'];
  const rows = [headerRow];

  // Find all accordions in the element
  const accordions = element.querySelectorAll('.expandablecontainer .accordion');
  accordions.forEach((accordion) => {
    // Title cell: try to find the best title element for semantic/formatting preservation
    let titleCell = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // Good title is a <h3> inside (which may itself contain a <a> or not)
      let h3 = trigger.querySelector('h3');
      // If <h3> contains another <h3>, use the innermost
      while (h3 && h3.querySelector('h3')) h3 = h3.querySelector('h3');
      if (h3 && h3.textContent.trim()) {
        // Use the original h3 element (reference, not clone or string)
        titleCell = h3;
      } else {
        // Fallback: all text of trigger
        titleCell = trigger.textContent.trim();
      }
    }
    // Content cell: preserve any HTML/formatting by referencing its children
    let contentCell = '';
    const content = accordion.querySelector('.accordion__content');
    if (content) {
      // If content has element children, reference them
      if (content.children.length > 0) {
        contentCell = Array.from(content.children);
      } else if (content.textContent.trim()) {
        // Otherwise, use text only
        contentCell = content.textContent.trim();
      }
    }
    // Only push the row if there is a title or content
    if (titleCell || contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Only replace if any accordion found, else do nothing
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
