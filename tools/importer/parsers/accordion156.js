/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion156)'];
  const rows = [];

  // Find the main column containing the accordion items
  const mainColumn = element.querySelector('.container__main');
  if (!mainColumn) return;

  // Get the heading and intro text if present
  let introEls = [];
  const headingBlock = mainColumn.querySelector('.text.parbase');
  if (headingBlock) {
    // Only reference direct children (h2, p, etc.)
    introEls = Array.from(headingBlock.children).filter(c => c.tagName === 'H2' || c.tagName === 'P');
    // If that's empty and headingBlock has text, reference the whole block
    if (introEls.length === 0 && headingBlock.textContent.trim()) {
      introEls = [headingBlock];
    }
  }

  // Accordion items are inside: .accordion-group > .expandablecontainer
  const accordionGroup = mainColumn.querySelector('.accordion-group');
  if (!accordionGroup) return;
  const accordionItems = Array.from(accordionGroup.querySelectorAll(':scope > .expandablecontainer'));

  accordionItems.forEach(item => {
    const accordion = item.querySelector(':scope > .accordion');
    if (!accordion) return;
    // Title: .accordion__trigger, then h3.delta inside (skip nested links)
    let titleEl = null;
    const trigger = accordion.querySelector('.accordion__trigger');
    if (trigger) {
      // Find first h3.delta inside, ignoring nested a/h3 structure
      let possibleTitles = Array.from(trigger.querySelectorAll('h3.delta'));
      let titleNode = possibleTitles[possibleTitles.length - 1];
      if (titleNode) {
        titleEl = titleNode;
      }
    }
    // Content: .accordion__content
    let contentEl = null;
    const content = accordion.querySelector('.accordion__content');
    if (content) {
      if (content.children.length === 1) {
        // Usually a div.text.parbase; use directly
        contentEl = content.firstElementChild;
      } else {
        // More than one child: wrap in div preserving all
        contentEl = document.createElement('div');
        Array.from(content.children).forEach(child => {
          contentEl.appendChild(child);
        });
      }
    }
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Prepend the intro row if present
  if (introEls.length) {
    rows.unshift([introEls, '']);
  }

  // Compose final table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
