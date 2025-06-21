/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare to gather all text content (headings, paragraphs, links)
  const cellContent = [];
  // Gather all text blocks (headings, paragraphs, etc.) in order
  // These are in .container__items (main and aside)
  const items = element.querySelectorAll('.container__items');
  items.forEach(item => {
    // For each .aem__component child (may contain the .text.parbase)
    const components = item.querySelectorAll('.aem__component');
    components.forEach(comp => {
      Array.from(comp.children).forEach(child => {
        cellContent.push(child);
      });
    });
  });

  // Extract the video (thumbnail and link)
  let thumbnailImg = null;
  let videoUrl = null;
  // Find the video anchor (YouTube)
  const videoOverlay = element.querySelector('.video .cp-video a.video__overlay');
  if (videoOverlay) {
    videoUrl = videoOverlay.getAttribute('href');
    thumbnailImg = videoOverlay.querySelector('img');
  }
  // Add the thumbnail image (if present)
  if (thumbnailImg) {
    cellContent.push(thumbnailImg);
  }
  // Add video URL as a link (if present)
  if (videoUrl) {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    cellContent.push(document.createElement('br'));
    cellContent.push(a);
  }

  // Compose the table as per the block spec
  const rows = [
    ['Video (video286)'],
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
