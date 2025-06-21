/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the navigation block for tabs
  const nav = element.querySelector('.navigation');
  if (!nav) return;
  const ul = nav.querySelector('ul.secondary__nav');
  if (!ul) return;

  // 2. Get all main tabs (li.first)
  const tabLis = Array.from(ul.children).filter(li => li.classList.contains('first'));
  if (!tabLis.length) return;

  // 3. Prepare header row (one column)
  const headerRow = ['Tabs (tabs18)'];
  const rows = [];

  tabLis.forEach(li => {
    // Tab label
    let label = '';
    const heading = li.querySelector('.first__heading');
    if (heading) {
      const labelSpan = heading.querySelector('.first__heading__text');
      if (labelSpan && labelSpan.textContent.trim()) {
        label = labelSpan.textContent.trim();
      } else {
        const headingLink = heading.querySelector('a');
        if (headingLink && headingLink.textContent.trim()) {
          label = headingLink.textContent.trim();
        } else if (heading.textContent.trim()) {
          label = heading.textContent.trim();
        }
      }
    }

    // Tab content: Prefer to use all content inside the <li> except the .first__heading
    let content = '';
    // Get a fragment containing all nodes except the heading
    const contentFragment = document.createDocumentFragment();
    Array.from(li.childNodes).forEach(node => {
      // Skip the heading node
      if (heading && node === heading) return;
      // Add anything else (subNav, text, etc)
      if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
        contentFragment.appendChild(node.cloneNode(true));
      }
    });
    // If the fragment is empty, fall back to the heading link as content
    if (!contentFragment.childNodes.length) {
      // Use the heading link if present, else the plain heading
      const headingLink = heading && heading.querySelector('a');
      if (headingLink && headingLink.textContent.trim()) {
        content = headingLink.textContent.trim();
      } else if (heading && heading.textContent.trim()) {
        content = heading.textContent.trim();
      } else {
        content = '';
      }
    } else {
      // Use the fragment as content
      content = contentFragment;
    }

    rows.push([label, content]);
  });

  // 4. Create the table and replace the original element
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
