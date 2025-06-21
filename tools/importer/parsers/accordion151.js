/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all .accordion elements under the main aside container
  function getAccordionElements(root) {
    // Only return those that are direct or indirect descendants of expandablecontainer
    // but not expandablecontainer itself (the class is reused for grouping)
    return Array.from(root.querySelectorAll('.accordion'));
  }

  // Helper: Extract (title, content) for each accordion
  function extractAccordionData(accordion) {
    // Title: inside .accordion__trigger, prefer h4 (the rendered visible label)
    let trigger = accordion.querySelector('.accordion__trigger');
    let title = null;
    if (trigger) {
      // Find h4 directly inside trigger or inside a > h4
      let h4 = trigger.querySelector('h4');
      if (h4) {
        title = h4;
      } else {
        // fallback: h3
        let h3 = trigger.querySelector('h3');
        if (h3) {
          title = h3;
        } else {
          // fallback: trigger
          title = trigger;
        }
      }
    }
    // Content: inside .accordion__content
    let content = accordion.querySelector('.accordion__content');
    // Defensive: if no content, create empty div
    if (!content) {
      content = document.createElement('div');
    }
    return [title, content];
  }

  // Find the aside container with the accordions
  let aside = element.querySelector('.container__items.container__aside');
  if (!aside) aside = element;
  const accordions = [];
  getAccordionElements(aside).forEach(accordion => {
    const [title, content] = extractAccordionData(accordion);
    if (title) {
      accordions.push([title, content]);
    }
  });

  // Build table rows, header first, then each accordion row (2 columns per row)
  const rows = [
    ['Accordion (accordion151)']
  ];
  accordions.forEach(([title, content]) => {
    rows.push([title, content]);
  });

  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
