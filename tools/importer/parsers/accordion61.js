/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row (single column)
  const headerRow = ['Accordion (accordion61)'];
  const rows = [headerRow];

  // Get all accordion items: each direct child div
  const items = Array.from(element.querySelectorAll(':scope > div'));

  items.forEach((item) => {
    // Find the first <p> in the item
    const p = item.querySelector('p');
    let titleCell, contentCell;

    if (p) {
      // We'll split at the first . or ?
      let disNumber = p.querySelector('.dis-number');
      let disNumberNode = disNumber ? disNumber : null;
      let titleParts = [];
      let contentParts = [];
      let foundSplit = false;
      let afterSplitNodes = [];

      // Remove disNumber from the p's childNodes for traversal, but keep it for title
      let childNodes = Array.from(p.childNodes);
      let filteredNodes = childNodes.filter(n => !(n.nodeType === 1 && n.classList && n.classList.contains('dis-number')));

      for (const node of filteredNodes) {
        if (foundSplit) {
          afterSplitNodes.push(node);
          continue;
        }
        let text = node.textContent || '';
        // Find the first . or ?
        let match = text.match(/^(.*?[\.?])((\s|\n|$).*)/);
        if (match) {
          // There is a split point
          if (node.nodeType === 3) {
            // Text node
            titleParts.push(document.createTextNode(match[1]));
            if (match[2] && match[2].trim() !== '') {
              afterSplitNodes.push(document.createTextNode(match[2]));
            }
          } else {
            // Element node
            let part = node.cloneNode(true);
            part.textContent = match[1];
            titleParts.push(part);
            if (match[2] && match[2].trim() !== '') {
              let partRest = node.cloneNode(true);
              partRest.textContent = match[2];
              afterSplitNodes.push(partRest);
            }
          }
          foundSplit = true;
        } else {
          titleParts.push(node);
        }
      }
      // Title cell: dis-number + titleParts
      if (disNumberNode) {
        titleCell = [disNumberNode, ...titleParts];
      } else {
        titleCell = titleParts;
      }

      // Content cell: everything after split in <p>, plus any other element in item (not back-to-origin)
      let contentNodes = [];
      // If any afterSplitNodes exist, wrap in <p> to preserve styling
      if (afterSplitNodes.length) {
        const pWrap = document.createElement('p');
        afterSplitNodes.forEach(n => pWrap.appendChild(n));
        contentNodes.push(pWrap);
      }
      // Add any other children of item except <p> and .back-to-origin
      Array.from(item.children).forEach(child => {
        if (child === p) return;
        if (child.matches('a.back-to-origin')) return;
        contentNodes.push(child);
      });
      // If contentNodes is empty, set to ''
      contentCell = contentNodes.length === 0 ? '' : (contentNodes.length === 1 ? contentNodes[0] : contentNodes);
    } else {
      // No <p>, fallback: Just split text at first . or ?
      let text = item.textContent.trim();
      let match = text.match(/^(.*?[\.?])((\s|\n|$).*)/);
      if (match) {
        titleCell = match[1];
        contentCell = match[2] && match[2].trim() !== '' ? match[2] : '';
      } else {
        titleCell = text;
        contentCell = '';
      }
    }
    // Always push two cells, even if one is empty
    rows.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
