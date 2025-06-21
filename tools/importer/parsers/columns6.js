/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  const grid = element.querySelector('.hero__grid');
  if (!grid) return;
  const columns = grid.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // First column: content
  const contentCol = columns[0];
  // Second column: image
  const imageCol = columns[1];

  // --- LEFT COLUMN (Content) ---
  const contentParts = [];
  // Heading
  const heading = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) contentParts.push(heading);
  // All direct <p> (skip empty ones)
  const ps = contentCol.querySelectorAll('p');
  ps.forEach((p) => {
    if (p.textContent && p.textContent.replace(/\u00a0/g, '').trim()) {
      contentParts.push(p);
    }
  });
  // Nav links (the .inpagenav block)
  const inpageNav = contentCol.querySelector('.inpagenav');
  if (inpageNav) contentParts.push(inpageNav);

  // --- RIGHT COLUMN (Image) ---
  let imgEl = '';
  const bgDiv = imageCol.querySelector('.hero__image');
  if (bgDiv && bgDiv.style && bgDiv.style.backgroundImage) {
    // Extract url from background-image
    const bg = bgDiv.style.backgroundImage;
    // backgroundImage: url("/content/dam/anzcomau/images/business-hub/homepage/business-hub-hero-1200x800-2.jpg")
    const match = bg.match(/url\(["']?(.*?)["']?\)/);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = '';
      img.setAttribute('loading', 'lazy');
      imgEl = img;
    }
  }

  // Compose the block table
  // Header row exactly as requested
  const cells = [
    ['Columns (columns6)'],
    [contentParts, imgEl]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
