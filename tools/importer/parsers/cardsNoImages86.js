/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to package heading and description together, preserving semantics
  function createCardCell(headingElem, descElems) {
    const container = document.createElement('div');
    if (headingElem) container.appendChild(headingElem);
    if (descElems && descElems.length) descElems.forEach(el => container.appendChild(el));
    return container;
  }

  // Find the main content area for cards
  const mainContent = element.querySelector('.cmp-contentfragment__element-value');
  const rows = [['Cards (cardsNoImages86)']];

  if (mainContent) {
    const children = Array.from(mainContent.childNodes).filter(node => {
      // Ignore non-element nodes that are just whitespace
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    let i = 0;
    while (i < children.length) {
      let node = children[i];
      // Card starts with a heading (h2-h6)
      if (node.nodeType === Node.ELEMENT_NODE && /^H[2-6]$/.test(node.tagName)) {
        const heading = node;
        const descs = [];
        let j = i + 1;
        // Gather all following p, ul, ol, div until next heading
        while (j < children.length) {
          const next = children[j];
          if (next.nodeType === Node.ELEMENT_NODE && /^H[2-6]$/.test(next.tagName)) break;
          if (
            next.nodeType === Node.ELEMENT_NODE &&
            (next.tagName === 'P' || next.tagName === 'UL' || next.tagName === 'OL' || next.tagName === 'DIV')
          ) {
            descs.push(next);
          }
          j++;
        }
        rows.push([createCardCell(heading, descs)]);
        i = j;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P' && node.textContent.trim()) {
        // Card with only a paragraph (no heading)
        const descs = [node];
        let j = i + 1;
        // Gather any following p, ul, ol, div until heading
        while (j < children.length) {
          const next = children[j];
          if (next.nodeType === Node.ELEMENT_NODE && /^H[2-6]$/.test(next.tagName)) break;
          if (
            next.nodeType === Node.ELEMENT_NODE &&
            (next.tagName === 'P' || next.tagName === 'UL' || next.tagName === 'OL' || next.tagName === 'DIV') &&
            next.textContent.trim()
          ) {
            descs.push(next);
          }
          j++;
        }
        rows.push([createCardCell(null, descs)]);
        i = j;
      } else {
        i++;
      }
    }
  }

  // Replace the original element with the cards table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
