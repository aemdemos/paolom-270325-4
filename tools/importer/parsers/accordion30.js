/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should have a single cell, then all content rows two cells
  const headerRow = ['Accordion (accordion30)'];
  const rows = [headerRow];

  // Find all accordion items in this container
  // In this HTML, there is one .accordion div inside
  const accordions = element.querySelectorAll('.accordion');
  accordions.forEach((accordion) => {
    // Title cell: extract from .accordion__trigger
    let titleCell = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      let h3 = trigger.querySelector('h3.delta');
      if (!h3) {
        h3 = trigger.querySelector('h3');
      }
      if (h3) {
        titleCell = h3.textContent.trim();
      } else {
        titleCell = trigger.textContent.trim();
      }
    }
    // Content cell: reference the .accordion__content element
    let contentCell = '';
    const content = accordion.querySelector('.accordion__content');
    if (content) {
      contentCell = content;
    }
    rows.push([titleCell, contentCell]);
  });

  // Ensure header row is only one cell, and every subsequent row has two cells
  // No further adjustment needed here, as the above structure matches the example
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
