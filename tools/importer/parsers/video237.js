/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as per block name
  const headerRow = ['Video (video237)'];

  // Container for all content as single cell (order preserved)
  const cellContent = [];

  // 1. Get the main heading (left column)
  const heading = element.querySelector('.column-heading h2, .column-heading .beta');
  if (heading && heading.textContent.trim()) {
    cellContent.push(heading);
  }

  // 2. Get all .container__item (these are the three main columns, in order)
  const items = element.querySelectorAll('.container__item.container__main__element');
  items.forEach((item) => {
    // Check if this item is the video block
    const videoAnchor = item.querySelector('a.video__overlay[role="button"]');
    if (videoAnchor) {
      // Poster image (the main visual)
      const poster = videoAnchor.querySelector('img');
      if (poster) cellContent.push(poster);
      // Video link (href)
      const videoHref = videoAnchor.getAttribute('href');
      if (videoHref) {
        // Reference the anchor as a link (not the image)
        const a = document.createElement('a');
        a.href = videoHref;
        a.textContent = videoHref;
        cellContent.push(a);
      }
      // Video overlay text/title (optional)
      const videoTitle = videoAnchor.querySelector('.video__title');
      if (videoTitle) cellContent.push(videoTitle);
    } else {
      // Otherwise, for text columns, include the whole .container__item (heading + text + links)
      if (item.textContent.trim()) {
        cellContent.push(item);
      }
    }
  });

  // 3. Create the block table
  const cells = [headerRow, [cellContent]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
