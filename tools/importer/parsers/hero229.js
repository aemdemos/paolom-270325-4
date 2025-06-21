/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to check for empty or whitespace-only headings
  function isEmptyHeading(h) {
    return !h.textContent.trim() || /^\u00a0$/.test(h.textContent.trim());
  }

  // 1. Find the main image (if any)
  let img = element.querySelector('img');

  // 2. Find the main heading (first non-empty h1-h3)
  let heading = null;
  const headingTags = ['h1', 'h2', 'h3'];
  for (const tag of headingTags) {
    const hs = element.querySelectorAll(tag);
    for (const h of hs) {
      if (!isEmptyHeading(h)) {
        heading = h;
        break;
      }
    }
    if (heading) break;
  }

  // 3. Find the subheading/paragraph (first p, which does not contain an image, and not empty)
  let subheading = null;
  const ps = element.querySelectorAll('p');
  for (const p of ps) {
    // skip p that contains image or is empty
    if (!p.querySelector('img') && p.textContent.trim()) {
      subheading = p;
      break;
    }
  }

  // Build the content for the bottom row (heading + subheading)
  // Only include if present.
  const contentArr = [];
  if (heading) contentArr.push(heading);
  if (subheading) contentArr.push(subheading);

  // Compose table rows as per example: 3 rows, 1 column
  // 1st row: block name 'Hero'
  // 2nd row: image (or empty if not present)
  // 3rd row: heading (and subheading if present)
  const cells = [
    ['Hero'],
    [img || ''],
    [contentArr.length > 0 ? contentArr : '']
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
