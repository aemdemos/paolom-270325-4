/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Accordion (accordion40)'];

  // Find the accordion root (expected only one per block given the HTML)
  const accordion = element.querySelector('.accordion');
  if (!accordion) return;

  // Title cell: get the heading (the clickable label)
  let titleCell = '';
  const trigger = accordion.querySelector('.accordion__trigger');
  if (trigger) {
    // The clickable label is typically h2 > a
    const h2 = trigger.querySelector('h2');
    if (h2) {
      let a = h2.querySelector('a');
      // If no <a>, fallback to entire h2
      titleCell = a ? a : h2;
    }
  }
  // If neither h2 nor a is found, leave as empty string (handles edge case)

  // Content cell: body/content of the accordion
  let contentCell = '';
  const content = accordion.querySelector('.accordion__content');
  if (content) {
    // Filter out empty divs (common in Accordions for spacing)
    // We want to preserve all meaningful content (including links, paragraphs, etc)
    // There may be one or more children (in provided HTML, the second <div> wraps the content)
    const validChildren = Array.from(content.children).filter((child) => {
      // Keep if not an empty div
      if (
        child.tagName !== 'DIV' ||
        child.innerHTML.trim().length > 0
      ) {
        return true;
      }
      return false;
    });
    if (validChildren.length === 1) {
      contentCell = validChildren[0];
    } else if (validChildren.length > 1) {
      contentCell = validChildren;
    }
    // If no valid children, leave as empty string
  }

  // Assemble array for createTable
  const tableRows = [headerRow, [titleCell, contentCell]];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
