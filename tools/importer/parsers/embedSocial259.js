/* global WebImporter */
export default function parse(element, { document }) {
  // Only create an Embed block if an actual embed (iframe, blockquote.twitter-tweet, or a direct social media link) is present
  let embedUrl = null;
  // Check for iframes to external embeds (not images)
  const iframe = element.querySelector('iframe[src]');
  if (iframe && iframe.src && !iframe.src.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
    embedUrl = iframe.src;
  }
  // Check for a Twitter/X blockquote
  if (!embedUrl) {
    const blockquote = element.querySelector('blockquote.twitter-tweet, blockquote[data-twitter]');
    if (blockquote) {
      // Twitter status links are usually the last <a> tag inside blockquote
      const links = blockquote.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"]');
      if (links.length) {
        embedUrl = links[links.length - 1].href;
      }
    }
  }
  // Optionally: check for a direct social embed link at top level
  if (!embedUrl) {
    const directLink = element.querySelector('a[href*="twitter.com"], a[href*="x.com"], a[href*="youtube.com"], a[href*="youtu.be"], a[href*="instagram.com"][href]');
    if (directLink && directLink.href) {
      embedUrl = directLink.href;
    }
  }
  // If no embed found, do nothing
  if (!embedUrl) return;
  // Build block table as per requirements
  const headerRow = ['Embed (embedSocial259)'];
  const contentRow = [embedUrl];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
