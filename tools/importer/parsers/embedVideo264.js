/* global WebImporter */
export default function parse(element, { document }) {
  // Only process if there is an iframe, or an external video link, or poster img
  let iframe = element.querySelector('iframe');
  let posterImg = element.querySelector('img');
  let videoUrl = null;

  if (iframe && iframe.src) {
    videoUrl = iframe.src;
  } else {
    // Search for an anchor to a YouTube or Vimeo video
    const anchors = element.querySelectorAll('a');
    for (const a of anchors) {
      if (/vimeo\.com|youtube\.com|youtu\.be/.test(a.href)) {
        videoUrl = a.href;
        break;
      }
    }
  }

  // If still nothing found, check for a <video> tag with src
  if (!videoUrl) {
    const video = element.querySelector('video');
    if (video && video.src) {
      videoUrl = video.src;
    }
  }

  // If there is no suitable content for this block, do nothing
  if (!videoUrl) return;

  // Build the cell content: poster image (if exists) above link
  const cellContent = [];
  if (posterImg) cellContent.push(posterImg);
  const link = document.createElement('a');
  link.href = videoUrl;
  link.textContent = videoUrl;
  cellContent.push(link);

  // Create the block table as per requirements
  const cells = [
    ['Embed (embedVideo264)'],
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
