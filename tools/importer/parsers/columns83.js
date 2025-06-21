/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Gather all top-level disclaimer blocks (direct children <div>s)
  const disclaimerBlocks = Array.from(element.querySelectorAll(':scope > div'));

  // 2. Each disclaimer forms a column. Each column contains:
  //    - The main paragraph with number+text+links (should remain as is)
  //    - Optionally, the Return link (included for semantic completeness)
  //    We include both as direct references.

  const disclaimerCols = disclaimerBlocks.map((block) => {
    const items = [];
    // Grab the paragraph
    const p = block.querySelector('p');
    if (p) items.push(p);
    // Grab the 'Return' link, if any
    const a = block.querySelector('a.back-to-origin');
    if (a) items.push(a);
    // If both are present, include as array; if only one, as single; else, empty string
    if (items.length === 1) return items[0];
    if (items.length > 1) return items;
    return '';
  });

  // 3. Build table rows
  const headerRow = ['Columns (columns83)'];
  // Table is: header row (single cell), second row (one cell per column/disclaimer)
  const rows = [headerRow, disclaimerCols];

  // 4. Create the table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
