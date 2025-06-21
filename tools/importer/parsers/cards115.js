/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Prepare header row as in the example
  const cells = [
    ['Cards (cards115)']
  ];

  // Step 2: Find the card container
  // It's the .border.box--pale-blue div
  const cardContainer = element.querySelector('.border.box--pale-blue');
  if (!cardContainer) return;

  // Get the two card columns: main (image), aside (text)
  const mainColumn = cardContainer.querySelector('.container__items.container__main');
  const asideColumn = cardContainer.querySelector('.container__items.container__aside');
  if (!mainColumn || !asideColumn) return;

  // ---------- IMAGE COLUMN ----------
  // Find image in the main column
  // The image is inside a <p> tag with a class (or not) and is the only <img>
  let image = null;
  const img = mainColumn.querySelector('img');
  if (img) image = img;

  // ---------- TEXT COLUMN ----------
  // We'll collate: heading (if present), description(s), and CTA (if present)
  // All from asideColumn > .text.parbase
  const asideText = asideColumn.querySelector('.text.parbase');
  if (!asideText) return;

  // Heading: h2, h3, h4 or element with .beta
  // Use the first match
  let heading = asideText.querySelector('h2, h3, h4, .beta');
  // Description: first <p> that isn't empty and doesn't only contain a link
  let description = null;
  const pList = Array.from(asideText.querySelectorAll('p'));
  // Find the first <p> that isn't empty and doesn't only contain a link with icon
  for (const p of pList) {
    // Skip if empty or whitespace only
    if (!p.textContent.trim()) continue;
    // Skip <p> that contains just a link (CTA)
    if (p.querySelector('a') && p.childNodes.length === 1) continue;
    // Otherwise use as description
    description = p;
    break;
  }
  // CTA: <a> with href, get the parent <p> to preserve formatting if possible
  let cta = null;
  const a = asideText.querySelector('a[href]');
  if (a) {
    // Try to use the parent <p>, unless it's the same element as description
    const parentP = a.closest('p');
    if (parentP && parentP !== description) {
      cta = parentP;
    } else {
      cta = a;
    }
  }

  // Compose the text cell as an array so each is on a separate line
  const textCell = [];
  if (heading) textCell.push(heading);
  if (description) textCell.push(description);
  if (cta) textCell.push(cta);

  // If textCell is empty, use an empty string (shouldn't happen)
  // Push the row: [image, text cell]
  cells.push([
    image || '',
    textCell.length ? textCell : ''
  ]);

  // Step 3: Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
