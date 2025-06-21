/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .accordion elements within this block
  const accordions = element.querySelectorAll('.accordion');
  const rows = [];
  // Add header row
  rows.push(['Accordion (accordion273)']);

  accordions.forEach((accordion) => {
    // Title cell: Find the heading/title for this item
    let titleContent = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // Try to reference the h3 (or whatever block contains the title)
      const h3 = trigger.querySelector('h3');
      if (h3) {
        // To keep semantic meaning, reference the h3 element directly but clean up its children
        // Remove the icon from the h3 for the table cell
        const h3Copy = h3.cloneNode(true);
        const icons = h3Copy.querySelectorAll('span.icon');
        icons.forEach(icon => icon.remove());
        // Remove empty <a> if present, and use its child nodes if they exist
        h3Copy.querySelectorAll('a').forEach(a => {
          if (!a.textContent.trim()) a.remove();
        });
        // If h3Copy has child nodes, use them
        if (h3Copy.childNodes.length === 1 && h3Copy.childNodes[0].nodeType === Node.TEXT_NODE) {
          titleContent = h3Copy.textContent.trim();
        } else {
          // Reference the h3, but clean of empty anchors/icons
          titleContent = h3Copy;
        }
      } else {
        // fallback: use trigger's text
        titleContent = trigger.textContent.trim();
      }
    }
    // Content cell: Get all direct child nodes of .accordion__content
    let contentCell;
    const content = accordion.querySelector('.accordion__content');
    if (content) {
      // Use an array of child nodes, filtering out empty text nodes
      const nodes = Array.from(content.childNodes).filter(n => {
        return !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim());
      });
      contentCell = nodes.length === 1 ? nodes[0] : nodes;
    } else {
      contentCell = '';
    }
    rows.push([
      titleContent || '',
      contentCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
