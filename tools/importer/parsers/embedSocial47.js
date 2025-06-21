/* global WebImporter */
export default function parse(element, { document }) {
  // Find true social embed links (not social sharing)
  // Twitter/X embed: should have anchor or iframe with /status/ in the href or src
  let embedUrl = null;

  // Look for iframe embeds (X/Twitter)
  const iframes = element.querySelectorAll('iframe');
  for (const iframe of iframes) {
    if (
      (iframe.src && (iframe.src.includes('twitter.com') || iframe.src.includes('x.com')))
      && /\/status\//.test(iframe.src)
    ) {
      embedUrl = iframe.src;
      break;
    }
  }

  // If not found, look for anchor that is a direct tweet/post (not sharing)
  if (!embedUrl) {
    const anchors = element.querySelectorAll('a');
    for (const a of anchors) {
      if (
        (a.href.includes('twitter.com') || a.href.includes('x.com')) &&
        /\/status\//.test(a.href) &&
        !a.href.includes('share?') &&
        !a.href.includes('intent') &&
        !a.href.includes('sharer') &&
        !a.href.startsWith('mailto:')
      ) {
        embedUrl = a.href;
        break;
      }
    }
  }

  // Fallback: check for blockquote.twitter-tweet > a
  if (!embedUrl) {
    const bq = element.querySelector('blockquote.twitter-tweet, blockquote.x-tweet');
    if (bq) {
      const bqA = bq.querySelector('a[href*="twitter.com"], a[href*="x.com"]');
      if (bqA && /\/status\//.test(bqA.href)) embedUrl = bqA.href;
    }
  }

  // Only create the block if a true embed link is found
  if (embedUrl) {
    const link = document.createElement('a');
    link.href = embedUrl;
    link.textContent = embedUrl;
    const cells = [
      ['Embed (embedSocial47)'],
      [link]
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
  // If no embedded status/post found, do not output a table or replace the element
}