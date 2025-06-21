/* global WebImporter */
export default function parse(element, { document }) {
  // Hero block table
  // 1. Header row: 'Hero'
  // 2. Image row: empty (no image in the HTML)
  // 3. Content row: all main text content

  // Get the block content div (the only child div of #disclaimer)
  const contentDiv = element.querySelector(':scope > div');
  if (!contentDiv) {
    // If for some reason there is no child, just remove the element
    element.replaceWith(document.createTextNode(''));
    return;
  }
  // Find all main content elements in the contentDiv except for navigation/back links
  const contentChildren = [];
  for (const child of contentDiv.children) {
    // Skip the return/back-to-origin link
    if (!child.classList.contains('back-to-origin')) {
      contentChildren.push(child);
    }
  }

  // If there are no main content children, leave cell empty
  let textCell = '';
  if (contentChildren.length === 1) {
    textCell = contentChildren[0];
  } else if (contentChildren.length > 1) {
    // Wrap in a div to preserve correct grouping
    const wrap = document.createElement('div');
    contentChildren.forEach(e => wrap.appendChild(e));
    textCell = wrap;
  }

  const cells = [
    ['Hero'],
    [''],
    [textCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
