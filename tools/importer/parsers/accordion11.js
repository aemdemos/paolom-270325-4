/* global WebImporter */
export default function parse(element, { document }) {
  // Build the block table header row
  const cells = [['Accordion (accordion11)']];

  // Find all .accordion blocks (accordion items) inside the element
  const accordionElements = element.querySelectorAll('.accordion');
  accordionElements.forEach((accordion) => {
    // Title cell
    let titleCell = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // Use a div to preserve all formatting and elements as in the source (bold, links, etc)
      // Reference the existing trigger's children for semantic preservation
      const triggerContent = Array.from(trigger.childNodes).filter(n => {
        // Remove icons or purely decorative elements
        if (n.nodeType === Node.ELEMENT_NODE && n.classList.contains('box--right')) return false;
        // Remove empty text nodes
        if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim()) return false;
        return true;
      });
      if (triggerContent.length === 1) {
        titleCell = triggerContent[0];
      } else if (triggerContent.length > 1) {
        titleCell = triggerContent;
      } else {
        // fallback: all textContent
        const div = document.createElement('div');
        div.textContent = trigger.textContent.trim();
        titleCell = div;
      }
    }

    // Content cell
    let contentCell = '';
    const content = accordion.querySelector('.accordion__content');
    if (content) {
      // Reference all child nodes of the content block (to preserve lists, formatting, etc.)
      const contentNodes = Array.from(content.childNodes).filter(n => {
        // Remove empty text nodes
        if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim()) return false;
        return true;
      });
      if (contentNodes.length === 1) {
        contentCell = contentNodes[0];
      } else if (contentNodes.length > 1) {
        contentCell = contentNodes;
      } else {
        // fallback: all textContent
        const div = document.createElement('div');
        div.textContent = content.textContent.trim();
        contentCell = div;
      }
    }

    // Only add a row if there is at least a title cell (per accordion item)
    if (titleCell) {
      cells.push([titleCell, contentCell]);
    }
  });

  // Only replace if there are at least two rows (header + at least one item)
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
