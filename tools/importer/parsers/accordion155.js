/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .accordion elements within the block
  const accordions = element.querySelectorAll('.accordion');
  const cells = [
    ['Accordion (accordion155)']
  ];

  accordions.forEach((accordion) => {
    // Extract the title (left cell)
    let titleEl = null;
    // The title is inside .accordion__trigger (may be a h3, or a link, or both)
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // Look for h3.delta inside the trigger
      let titleCandidate = trigger.querySelector('h3.delta');
      if (titleCandidate) {
        // If there is another h3.delta inside (sometimes nested in an a), use the innermost
        const nestedH3 = titleCandidate.querySelector('h3.delta');
        if (nestedH3) {
          titleEl = nestedH3;
        } else {
          // Sometimes the text is wrapped in an <a> inside the h3
          const link = titleCandidate.querySelector('a');
          if (link && link.textContent.trim()) {
            // Preserve semantic structure: if the link wraps a h3, use the content of the h3
            const linkNestedH3 = link.querySelector('h3.delta');
            if (linkNestedH3) {
              titleEl = linkNestedH3;
            } else {
              // Use the link text
              const span = document.createElement('span');
              span.textContent = link.textContent.trim();
              titleEl = span;
            }
          } else {
            titleEl = titleCandidate;
          }
        }
      } else {
        // fallback: take first element child text in the trigger
        if (trigger.textContent) {
          const span = document.createElement('span');
          span.textContent = trigger.textContent.trim();
          titleEl = span;
        }
      }
    }
    // fallback: just use accordion first h3, if all else fails
    if (!titleEl) {
      const h3 = accordion.querySelector('h3');
      if (h3) {
        titleEl = h3;
      } else {
        // fallback: empty span
        titleEl = document.createElement('span');
      }
    }

    // Extract content (right cell)
    // We want all direct children of .accordion__content (may include .text.parbase, .video, etc)
    let contentCell = [];
    const content = accordion.querySelector('.accordion__content');
    if (content) {
      // Loop over children and collect as array (to preserve structure and allow for multiple elements)
      content.childNodes.forEach((node) => {
        // ignore empty text nodes
        if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
        contentCell.push(node);
      });
      // If nothing added (all whitespace), supply empty div for cell
      if (contentCell.length === 0) {
        contentCell = [document.createElement('div')];
      }
    } else {
      // fallback: empty div
      contentCell = [document.createElement('div')];
    }

    cells.push([titleEl, contentCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
