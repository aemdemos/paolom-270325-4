/* global WebImporter */
export default function parse(element, { document }) {
  // Create the table header as in the example (exact match)
  const headerRow = ['Video (video258)'];

  // --- Gather all text content (title and description) ---
  // Collect all .text.parbase elements (order matters)
  const textContent = [];
  element.querySelectorAll('.text.parbase').forEach(block => {
    // Push all children (typically h2, p) in order
    Array.from(block.children).forEach(child => textContent.push(child));
  });

  // --- Gather video poster image and video link ---
  // Locate the anchor linking to the video
  let videoLink = null;
  let posterImg = null;
  // Look for the most likely anchor in the aside video area
  const aside = element.querySelector('.container__aside');
  let videoAnchor = aside ? aside.querySelector('a[data-videoid], a.video__overlay') : null;
  if (!videoAnchor) {
    // Fallback: search entire element if aside missing
    videoAnchor = element.querySelector('a[data-videoid], a.video__overlay');
  }
  if (videoAnchor) {
    videoLink = videoAnchor.getAttribute('href');
    posterImg = videoAnchor.querySelector('img');
  }

  // Compose the cell content: text (title/desc), poster image, link (in order)
  const cellContent = [];
  if (textContent.length > 0) cellContent.push(...textContent);
  if (posterImg) cellContent.push(posterImg);
  if (videoLink) {
    // Reference link element for the video
    const link = document.createElement('a');
    link.href = videoLink;
    link.textContent = videoLink;
    cellContent.push(link);
  }

  // If there's no content, do not replace
  if (cellContent.length === 0) return;

  // Build the table with 1 column, 2 rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [cellContent.length === 1 ? cellContent[0] : cellContent]
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
