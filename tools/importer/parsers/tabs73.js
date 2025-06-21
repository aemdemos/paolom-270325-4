/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate child blocks (disclaimer sections)
  const blocks = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare tab labels and contents
  const tabLabels = [];
  const tabContents = [];
  blocks.forEach(block => {
    // Find the relevant paragraph (content)
    const p = block.querySelector('p');
    if (!p) return;
    // Find the number span as the tab label
    const numSpan = p.querySelector('.dis-number');
    let label = '';
    if (numSpan) {
      label = numSpan.textContent.trim().replace(/\.$/, ''); // remove trailing dot
      numSpan.remove(); // Remove label for content cell
    } else {
      // Fallback: Use first few words as label
      label = p.textContent.trim().split(' ')[0];
    }
    tabLabels.push(label);
    // Remove trailing 'Return' link for cleaner content
    const returnLink = block.querySelector('a.back-to-origin');
    if (returnLink) returnLink.remove();
    // Add the actual content paragraph (which has links etc.)
    tabContents.push(p);
  });
  // Do nothing if no valid tabs found
  if (tabLabels.length === 0) return;
  // Create rows for table: header, labels, and contents
  const cells = [
    ['Tabs (tabs73)'],          // Header row: single column
    tabLabels,                 // Second row: each label in its own cell
    tabContents                // Third row: each content in its own cell
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
