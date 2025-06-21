/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row using the exact block name
  const headerRow = ['Accordion (accordion10)'];
  const rows = [headerRow];

  // Utility: Find immediate expandablecontainer children containing accordions
  function findAccordionItems(root) {
    // Look for direct .accordion-group or .expandablecontainer children
    let containers = Array.from(root.querySelectorAll(':scope > .accordion-group, :scope > .expandablecontainer'));
    // If no such grouping containers, try root itself
    if (containers.length === 0 && root.classList.contains('accordion')) {
      return [root];
    }
    let items = [];
    containers.forEach(container => {
      // If the container itself is an accordion, use it
      if (container.classList.contains('accordion')) {
        items.push(container);
      } else {
        // Otherwise look for direct .expandablecontainer > .accordion
        let innerContainers = Array.from(container.querySelectorAll(':scope > .expandablecontainer'));
        innerContainers.forEach(inner => {
          const acc = inner.querySelector(':scope > .accordion');
          if (acc) items.push(acc);
        });
      }
    });
    // Fallback: if still nothing, try for any .accordion under root
    if (items.length === 0) {
      items = Array.from(root.querySelectorAll('.accordion'));
    }
    return items;
  }

  const accordionItems = findAccordionItems(element);

  accordionItems.forEach(accordion => {
    // --- Title --- //
    let title = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // The clickable title is a h3, possibly inside an <a>, inside .accordion__trigger
      // There may be extra nested h3s; always take the innermost meaningful one
      let h3s = Array.from(trigger.querySelectorAll('h3'));
      if (h3s.length > 0) {
        // Use the last h3 (deepest)
        title = h3s[h3s.length - 1].textContent.trim();
      } else {
        // fallback: use text content
        title = trigger.textContent.trim();
      }
    }
    // --- Content --- //
    // Keep full .accordion__content including all its child elements
    const content = accordion.querySelector('.accordion__content');
    let contentBlock = null;
    if (content) {
      // Remove empty <ul> at the end if present (common in some WCM sources with errant DOM)
      const ul = content.querySelector(':scope > ul');
      if (ul && ul.children.length === 0 && content.children[content.children.length - 1] === ul){
        ul.remove();
      }
      contentBlock = content;
    }
    rows.push([title, contentBlock]);
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
