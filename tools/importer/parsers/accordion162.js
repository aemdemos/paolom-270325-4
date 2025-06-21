/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per specification
  const headerRow = ['Accordion (accordion162)'];
  const rows = [headerRow];

  // There is one accordion item in this HTML: title in .accordion__trigger, content in .accordion__content
  const trigger = element.querySelector('.accordion__trigger h3');
  let titleCell = '';
  if (trigger) {
    // Create a <p> and extract the visible title text, ignoring empty <a> and the icon <span>
    // Sometimes, the title is in the text node, sometimes in <a>.
    let titleText = '';
    trigger.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        titleText += node.textContent;
      }
      // If <a> and it contains text, include the text
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A' && node.textContent.trim()) {
        titleText += node.textContent;
      }
    });
    titleCell = document.createElement('p');
    titleCell.textContent = titleText.trim();
  } else {
    titleCell = document.createElement('p');
    titleCell.textContent = '';
  }

  // Content cell: reference all children of .accordion__content
  let contentCell = '';
  const content = element.querySelector('.accordion__content');
  if (content) {
    // We want to include all content, including tables, notes, etc.
    // This matches the resilience guideline.
    if (content.children.length === 1) {
      // If only one child, just use it directly
      contentCell = content.firstElementChild;
    } else if (content.children.length > 1) {
      // Multiple children: combine as array
      contentCell = Array.from(content.children);
    } else {
      // fallback if only text nodes
      contentCell = content.textContent.trim();
    }
  }

  rows.push([titleCell, contentCell]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
