/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main article content fragment
  const cfElement = element.querySelector('.cmp-contentfragment__element-value');
  if (!cfElement) return;

  // Collect all child nodes (preserving original structure and semantics)
  const contentNodes = Array.from(cfElement.childNodes).filter(node => {
    // Filter out empty text nodes
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return false;
    return true;
  });

  // Try to find a poster image (YouTube thumbnail or custom poster)
  let posterImg = null;
  const coverImageDiv = cfElement.querySelector('.cfcontainer__video-cover-image');
  if (coverImageDiv) {
    const bgStyle = coverImageDiv.style.backgroundImage;
    const urlMatch = bgStyle.match(/url\((['"]?)(.*?)\1\)/);
    if (urlMatch && urlMatch[2]) {
      posterImg = document.createElement('img');
      posterImg.src = urlMatch[2];
      // Use available title as alt text
      const titleSpan = coverImageDiv.querySelector('.cfcontainer__video-cover-title');
      posterImg.alt = titleSpan ? titleSpan.textContent.trim() : '';
    }
  }

  // Try to find video embed/link
  let videoUrl = null;
  // Look for <embed> inside cfElement
  const embed = cfElement.querySelector('embed');
  if (embed && embed.src) {
    const src = embed.src;
    // Try to convert YouTube embed src to a watch URL if possible
    const match = src.match(/youtube.com\/embed\/([^?&/]+)/);
    if (match) {
      videoUrl = 'https://www.youtube.com/watch?v=' + match[1];
    } else {
      videoUrl = src;
    }
  }

  // Compose the block table structure
  const headerRow = ['Embed (embedVideo226)'];
  const cellContent = [];
  // Insert all content nodes (text, headings, paragraphs, etc.)
  if (contentNodes.length) cellContent.push(...contentNodes);
  // Insert poster image (if found)
  if (posterImg) cellContent.push(posterImg);
  // Insert video link (if found)
  if (videoUrl) {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.textContent = videoUrl;
    cellContent.push(a);
  }

  if (cellContent.length === 0) return;
  const tableRows = [headerRow, [cellContent]];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
