/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table block header row, per instructions and visual example
  const headerRow = ['Table (striped, bordered)'];

  // 2. Find the main content column (left side)
  const mainColumn = element.querySelector('.container__main');
  if (!mainColumn) return;

  // 3. Gather content elements to include in the table cell

  // Heading (h2) - 'Rates, fees & benefits...'
  const heading = mainColumn.querySelector('h2');

  // All tables in the left/main column (interest rates & important info)
  const tables = mainColumn.querySelectorAll('table');
  const table1 = tables[0] || null;
  const table2 = tables[1] || null;

  // Tiered interest explanation: look for a non-empty <p> after table1
  let explanation = null;
  if (table1) {
    let curr = table1.parentElement.nextElementSibling;
    // Loop until we find a non-empty <p>
    while (curr) {
      if (
        curr.tagName === 'DIV' &&
        curr.classList.contains('text') &&
        curr.querySelector('p') &&
        curr.textContent.trim()
      ) {
        // Only add <p> with text
        Array.from(curr.querySelectorAll('p')).forEach(p => {
          if (p.textContent.trim()) {
            if (!explanation) explanation = [];
            explanation.push(p);
          }
        });
        break;
      }
      curr = curr.nextElementSibling;
    }
  }

  // Learn more link - last <a> in main column w/ correct text
  let learnMore = null;
  const links = Array.from(mainColumn.querySelectorAll('a'));
  for (let i = links.length - 1; i >= 0; i--) {
    const a = links[i];
    if (a.textContent.trim().toLowerCase().includes('learn more about business online saver')) {
      // Use containing <p> if exists
      if (a.parentElement && a.parentElement.tagName === 'P') {
        learnMore = a.parentElement;
      } else {
        learnMore = a;
      }
      break;
    }
  }

  // Build content array, referencing real elements in order
  const contentArr = [];
  if (heading) contentArr.push(heading);
  if (table1) contentArr.push(table1);
  if (explanation) contentArr.push(...explanation);
  if (table2) contentArr.push(table2);
  if (learnMore) contentArr.push(learnMore);

  // 4. Build table structure as per requirements
  const rows = [headerRow, [contentArr]];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
