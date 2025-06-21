/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordions in the source element (direct or nested)
  const accordions = Array.from(element.querySelectorAll('.accordion'));
  if (!accordions.length) return;

  // Build the table rows: first header row must be a single cell, then each accordion row is 2 columns
  const rows = [];
  rows.push(['Accordion (accordion16)']); // Header row: single cell

  accordions.forEach((accordion) => {
    // --- Title Cell ---
    let title = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      const a = trigger.querySelector('a');
      if (a && a.textContent.trim()) {
        title = a.textContent.trim();
      } else {
        // Try heading tags
        const heading = trigger.querySelector('h1,h2,h3,h4,h5,h6');
        if (heading && heading.textContent.trim()) {
          title = heading.textContent.trim();
        } else {
          // Fallback: just get the trigger text
          title = trigger.textContent.trim();
        }
      }
    }
    // --- Content Cell ---
    let contentElem = accordion.querySelector('.accordion__content') || '';
    // Add new row (2 columns)
    rows.push([title, contentElem]);
  });

  // Create the table using the documented helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
