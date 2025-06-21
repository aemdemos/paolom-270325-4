/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content block containing the cards info
  const fragmentRoot = element.querySelector('.cmp-contentfragment__element-value');
  if (!fragmentRoot) return;

  // Get all children as an array for proper processing
  const children = Array.from(fragmentRoot.childNodes);

  // Prepare to extract each card: look for H2s that are numbered (1., 2., ... 6.)
  const rows = [];
  let i = 0;
  while (i < children.length) {
    const node = children[i];
    if (
      node.nodeType === 1 &&
      node.tagName === 'H2' &&
      /^\d+\./.test(node.textContent.trim())
    ) {
      // Card heading found
      const cardFragment = document.createElement('div');
      cardFragment.appendChild(node); // Reference (not clone) the original heading node
      // Collect all siblings after this H2, until next numbered H2 or end
      let j = i + 1;
      while (j < children.length) {
        const sibling = children[j];
        if (
          sibling.nodeType === 1 &&
          sibling.tagName === 'H2' &&
          /^\d+\./.test(sibling.textContent.trim())
        ) {
          break;
        }
        cardFragment.appendChild(sibling);
        j++;
      }
      rows.push([cardFragment]);
      i = j;
      continue;
    }
    i++;
  }

  // Build the table: header row plus card rows
  const tableRows = [['Cards (cardsNoImages76)'], ...rows];

  // Create the table and replace the element
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
