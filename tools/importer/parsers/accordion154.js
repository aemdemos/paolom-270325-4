/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion group containing all accordion items
  const accordionGroup = element.querySelector('.accordion-group');
  if (!accordionGroup) return;

  // Each direct child .expandablecontainer of .accordion-group is an accordion item
  const accordionItems = Array.from(accordionGroup.querySelectorAll(':scope > .expandablecontainer'));

  // Prepare rows; first is header
  const rows = [['Accordion (accordion154)']];

  accordionItems.forEach((item) => {
    // Extract the title: .accordion__trigger > h3.delta (not .semibold)
    let titleElem = '';
    const trigger = item.querySelector('.accordion__trigger');
    if (trigger) {
      // Find the innermost h3 that is the actual title (not the outer h3)
      const innerH3 = trigger.querySelector('h3.delta:not(.semibold)');
      if (innerH3) {
        titleElem = innerH3;
      } else {
        // fallback: get the first h3 inside trigger
        const h3 = trigger.querySelector('h3');
        titleElem = h3 ? h3 : '';
      }
    }
    // If titleElem is missing, use empty
    if (!titleElem) {
      titleElem = document.createElement('div');
    }
    // Extract content: .accordion__content
    let contentElem = '';
    const content = item.querySelector('.accordion__content');
    if (content) {
      contentElem = content;
    } else {
      contentElem = document.createElement('div');
    }
    rows.push([titleElem, contentElem]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
