/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordions (support multi-item accordions)
  const accordions = element.querySelectorAll('.accordion');
  if (!accordions.length) return;

  // Prepare the table rows array
  const cells = [];
  // Header row matches example exactly
  cells.push(['Accordion (accordion45)']);

  // For each accordion, extract title and content
  accordions.forEach((accordion) => {
    // Title extraction
    let title = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      const h3 = trigger.querySelector('h3');
      if (h3) {
        const a = h3.querySelector('a');
        if (a) {
          title = a.textContent.trim();
        } else {
          title = h3.textContent.trim();
        }
      }
    }
    // Content extraction (reference the actual element)
    const content = accordion.querySelector('.accordion__content');
    if (title && content) {
      cells.push([title, content]);
    }
  });

  // Only continue if at least one accordion row found
  if (cells.length < 2) return;

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
