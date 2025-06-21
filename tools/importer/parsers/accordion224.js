/* global WebImporter */
export default function parse(element, { document }) {
  // Build rows for the accordion (each with 2 columns: title, content)
  const rows = [];
  const disclaimerContainer = element.querySelector('#disclaimer');
  if (disclaimerContainer) {
    disclaimerContainer.querySelectorAll(':scope > div').forEach((item) => {
      // Title = .dis-number text
      let title = '';
      const numSpan = item.querySelector('.dis-number');
      if (numSpan) {
        title = numSpan.textContent.trim();
      }
      // Content = paragraph minus the number span (reference if possible)
      let contentEl = null;
      const p = item.querySelector('p');
      if (p) {
        // Try referencing the existing DOM node, but remove the number span
        const nodes = Array.from(p.childNodes).filter(n => !(n.nodeType === 1 && n.classList.contains('dis-number')));
        if (nodes.length === 1 && nodes[0].nodeType === 1) {
          contentEl = nodes[0];
        } else {
          const newP = document.createElement('p');
          nodes.forEach(n => newP.appendChild(n.cloneNode(true)));
          contentEl = newP;
        }
      }
      if (!contentEl) {
        contentEl = document.createTextNode(item.textContent.trim());
      }
      rows.push([title, contentEl]);
    });
  }

  // Manual table creation so we can set colspan=2 on the header
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.setAttribute('colspan', '2');
  headerTh.textContent = 'Accordion (accordion224)';
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      if (typeof cell === 'string') {
        td.textContent = cell;
      } else {
        td.append(cell);
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  element.replaceWith(table);
}
