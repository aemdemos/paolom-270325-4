/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Embed (embedVideo132)'];

  // Find the video link and the poster image from left column
  let videoUrl = '';
  let posterImg = null;
  const videoLink = element.querySelector('a.video__overlay');
  if (videoLink && videoLink.href) {
    videoUrl = videoLink.href;
  }
  // Find the poster image (img inside .video__container)
  const videoContainer = element.querySelector('.video__container');
  if (videoContainer) {
    posterImg = videoContainer.querySelector('img');
  }

  // Find text content (right column), which is the .text.parbase block
  const textBlock = element.querySelector('.text.parbase');
  // Edge case: if textBlock exists, preserve it as a block; otherwise skip

  // Compose the block cell, order: posterImg, video link, text block (as in screenshot)
  const contentCell = [];
  if (posterImg) {
    contentCell.push(posterImg);
  }
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    if (contentCell.length > 0) contentCell.push(document.createElement('br'));
    contentCell.push(link);
  }
  if (textBlock) {
    // Add a line break before text if there is video or image above
    if (contentCell.length > 0) contentCell.push(document.createElement('br'));
    contentCell.push(textBlock);
  }

  // Fallback if nothing found: include all of element's content
  if (!contentCell.length) {
    contentCell.push(...element.childNodes);
  }

  // Compose final table cells
  const cells = [
    headerRow,
    [contentCell]
  ];

  // Create and replace with the structured table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
