/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Columns (columns253)'];

  // 2. Find the grid containing the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // 3. Find the two column containers (main and aside)
  const mainWrap = grid.querySelector('.container__main');
  const asideWrap = grid.querySelector('.container__aside');

  // Defensive: If either column is missing, use an empty fragment
  const colNodes = [];
  // --- Left column (main) ---
  if (mainWrap) {
    // Look for the first .text.parbase
    const leftParbase = mainWrap.querySelector('.text.parbase');
    if (leftParbase) {
      colNodes.push(leftParbase);
    } else {
      // fallback to the .container__main wrapper
      colNodes.push(mainWrap);
    }
  } else {
    // fallback: push empty fragment
    colNodes.push(document.createDocumentFragment());
  }
  // --- Right column (aside) ---
  if (asideWrap) {
    const rightParbase = asideWrap.querySelector('.text.parbase');
    if (rightParbase) {
      colNodes.push(rightParbase);
    } else {
      colNodes.push(asideWrap);
    }
  } else {
    colNodes.push(document.createDocumentFragment());
  }

  // 4. Compose the cells array for the block
  const cells = [
    headerRow,
    colNodes,
  ];

  // 5. Create and insert the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
