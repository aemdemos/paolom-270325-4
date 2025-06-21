/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find all columns in the grid
  const colEls = Array.from(grid.querySelectorAll('.container__item.container__main__element'));

  // For each column, extract the relevant content (icon, heading, description, download link)
  function getColumnContent(colEl) {
    const imageText = colEl.querySelector('.image-text');
    if (!imageText) return [];
    const content = [];
    // image
    const img = imageText.querySelector('.image img');
    if (img) content.push(img);
    // heading
    const heading = imageText.querySelector('.text h3');
    if (heading) content.push(heading);
    // description (first paragraph that is not a link)
    const paras = Array.from(imageText.querySelectorAll('.text p'));
    const descPara = paras.find(p => !p.querySelector('a'));
    if (descPara) content.push(descPara);
    // link (paragraph that contains a link)
    const linkPara = paras.find(p => p.querySelector('a'));
    if (linkPara) content.push(linkPara);
    return content;
  }

  // Header row should be a single cell, even when there are multiple columns in the next row
  const headerRow = ['Columns (columns243)'];
  // Content row: each cell is the content for one column
  const contentRow = colEls.map(getColumnContent);

  // Assemble the table: header row (1 cell), then content row (N cells for N columns)
  const rows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
