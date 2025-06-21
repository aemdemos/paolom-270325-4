/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content fragment value
  const cfValue = element.querySelector('.cmp-contentfragment__element-value');
  if (!cfValue) return;

  // Gather all non-empty child nodes
  const nodes = Array.from(cfValue.childNodes).filter(n => n.nodeType !== 3 || n.textContent.trim());

  // Split into two logical columns as per the Markdown example:
  // 1st column: Intro paragraph, 'Key points' heading and list
  // 2nd column: The rest of the content (from the next heading onwards)
  let col1 = [];
  let col2 = [];
  let i = 0;

  // First: grab intro paragraph(s)
  while (i < nodes.length && !(nodes[i].nodeType === 1 && nodes[i].tagName === 'H2')) {
    col1.push(nodes[i]);
    i++;
  }
  // Next: 'Key points' H2 and its UL
  if (i < nodes.length && nodes[i].tagName === 'H2') {
    col1.push(nodes[i]);
    i++;
    if (i < nodes.length && nodes[i].tagName === 'UL') {
      col1.push(nodes[i]);
      i++;
    }
  }

  // The rest goes into column 2
  col2 = nodes.slice(i);

  // Build the header row and content row with two columns
  const cells = [
    ['Columns (columns275)'],
    [col1, col2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
