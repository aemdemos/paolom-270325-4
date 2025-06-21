/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the aside/accordion column content
  let asideCol = null;
  // Find all immediate children divs, descend to main/aside
  const mainRows = element.querySelectorAll(':scope > div > div > div');
  for (const div of mainRows) {
    if (div.classList.contains('container__items') && div.classList.contains('container__aside')) {
      asideCol = div;
      break;
    }
  }
  if (!asideCol) return;

  // 2. Find all top-level accordion expandablecontainers in the aside column
  // Only accept direct children (avoid nested expandablecontainer)
  const accordionWrappers = Array.from(asideCol.querySelectorAll(':scope > div > .aem__component > div.expandablecontainer'));
  const rows = [
    ['Accordion (accordion88)']
  ];

  accordionWrappers.forEach(wrapper => {
    const accordion = wrapper.querySelector(':scope > .accordion');
    if (!accordion) return;
    // Title cell: get the title text from accordion__trigger > h3.delta:last-of-type
    let title = '';
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      const titleH3 = trigger.querySelector('h3.delta:last-of-type');
      if (titleH3) {
        title = titleH3.textContent.trim();
      } else {
        // Fallback: get the entire trigger text
        title = trigger.textContent.trim();
      }
    }
    // Content cell: get .accordion__content
    const content = accordion.querySelector('.accordion__content');
    let contentCell = '';
    if (content) {
      // Only include child nodes that are not empty text
      const nodes = Array.from(content.childNodes).filter(node => {
        if (node.nodeType === 3) {
          // Text nodes: skip if whitespace only
          return node.textContent.trim().length > 0;
        }
        return true;
      });
      if (nodes.length === 1) {
        contentCell = nodes[0];
      } else if (nodes.length > 1) {
        contentCell = nodes;
      }
    }
    rows.push([title, contentCell]);
  });

  // 3. Create the table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
