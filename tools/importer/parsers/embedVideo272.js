/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the full content for the embed block
  function extractEmbedBlockContent(container) {
    const content = [];
    // Grab the video poster image (if any)
    const img = container.querySelector('img');
    if (img) {
      content.push(img);
    }
    // Grab the video link
    const a = container.querySelector('a.video__overlay');
    if (a && a.href) {
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = a.href;
      content.push(link);
    }
    // Add the text below the video thumbnail (title/description)
    const textBlock = container.querySelector('.text.parbase');
    if (textBlock) {
      content.push(textBlock);
    }
    // Add the accordion transcript content (if present)
    const accordionContent = container.querySelector('.accordion__content');
    if (accordionContent) {
      content.push(accordionContent);
    }
    return content;
  }

  // Process all valid video blocks (main + aside)
  const selectors = ['.container__main__element', '.container__aside__element'];
  selectors.forEach(sel => {
    const nodes = element.querySelectorAll(sel);
    nodes.forEach(node => {
      const content = extractEmbedBlockContent(node);
      if (content.length > 0) {
        const table = WebImporter.DOMUtils.createTable([
          ['Embed (embedVideo272)'],
          [content]
        ], document);
        node.replaceWith(table);
      }
    });
  });
}
