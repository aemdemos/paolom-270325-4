/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header, matches example
  const headerRow = ['Embed (embedVideo140)'];

  // The block expects a single cell containing the relevant content
  // In this HTML, each 'div' child is a numbered disclaimer, often containing a <p> and a 'Return' link
  // We want the text+links from the <p> in each disclaimer, in order, with each disclaimer on its own line in the cell.

  const disclaimerDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each disclaimer div, extract its <p> (text and links)
  const disclaimerParagraphs = disclaimerDivs.map(div => {
    // Find first <p> in the div
    const p = div.querySelector('p');
    return p ? p : null;
  }).filter(Boolean);

  // If no paragraphs, handle gracefully
  let cellContent;
  if (disclaimerParagraphs.length === 0) {
    cellContent = '';
  } else {
    // If >1 paragraph, separate by <br> for clarity in the cell
    if (disclaimerParagraphs.length === 1) {
      cellContent = disclaimerParagraphs[0];
    } else {
      // Interleave with <br><br> for visual separation, as in the screenshot
      const contentArr = [];
      disclaimerParagraphs.forEach((p, idx) => {
        if (idx > 0) {
          contentArr.push(document.createElement('br'));
          contentArr.push(document.createElement('br'));
        }
        contentArr.push(p);
      });
      cellContent = contentArr;
    }
  }

  const cells = [
    headerRow,
    [cellContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
