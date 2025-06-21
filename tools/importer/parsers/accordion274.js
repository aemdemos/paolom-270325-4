/* global WebImporter */
export default function parse(element, { document }) {
  // Find the aside container that contains the accordion
  const aside = element.querySelector('.container__items.container__aside');
  if (!aside) return;

  // Find all direct accordion elements inside nested .expandablecontainer > .accordion-group > .expandablecontainer > .accordion etc.
  // Flatten all .accordion in all descendants;
  const accordions = aside.querySelectorAll('.accordion');

  const cells = [
    ['Accordion (accordion274)']
  ];

  accordions.forEach((acc) => {
    // Get title: inside .accordion__trigger > h3 > a (or h3 text if no a)
    let titleContent;
    const trigger = acc.querySelector('.accordion__trigger');
    if (trigger) {
      const h3 = trigger.querySelector('h3');
      if (h3) {
        const a = h3.querySelector('a');
        if (a) {
          // Reference the anchor element directly for proper semantic meaning
          titleContent = a;
        } else {
          // Otherwise, use the h3 (includes span, if any)
          // To avoid including the arrow icon span, we want only the text node(s)
          // Create a span to hold only the text nodes (excluding icon span)
          const temp = document.createElement('span');
          Array.from(h3.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'SPAN')) {
              temp.appendChild(node.cloneNode(true));
            }
          });
          titleContent = temp.childNodes.length === 1 ? temp.firstChild : temp;
        }
      } else {
        // fallback: just use trigger text
        titleContent = document.createTextNode(trigger.textContent.trim());
      }
    } else {
      // fallback: just use acc text
      titleContent = document.createTextNode(acc.textContent.trim());
    }

    // Get content from .accordion__content
    const content = acc.querySelector('.accordion__content');
    let contentElements = [];
    if (content) {
      // Include all children of accordion__content
      contentElements = Array.from(content.children);
      if (contentElements.length === 0 && content.textContent.trim()) {
        // fallback: textContent as a text node
        contentElements = [document.createTextNode(content.textContent.trim())];
      }
    } else {
      // fallback: no content found
      contentElements = [document.createTextNode('')];
    }
    cells.push([
      titleContent,
      contentElements.length === 1 ? contentElements[0] : contentElements
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
