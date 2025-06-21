/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the first image inside left/main column
  function findHeroImage() {
    // The left/main container (may be empty)
    const leftCol = element.querySelector('.column-heading, .container__default');
    if (leftCol) {
      const img = leftCol.querySelector('img');
      if (img) return img;
    }
    // Sometimes it's in the .container__main
    const mainCol = element.querySelector('.container__main img');
    if (mainCol) return mainCol;
    // Fallback: any image inside element
    return element.querySelector('img');
  }

  // Helper to find the heading/content/cta in the right/aside column
  function findHeroContent() {
    // Try aside column first
    let aside = element.querySelector('.container__aside .text.parbase');
    if (!aside) {
      // Fallback: look for .container__main .text.parbase
      aside = element.querySelector('.container__main .text.parbase');
    }
    if (!aside) return [];
    // Filter out empty <p> unless it contains an <img>
    return Array.from(aside.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
        // If <p> has only whitespace and no <img>, skip
        if (node.textContent.trim() === '' && !node.querySelector('img')) return false;
      }
      // Otherwise, keep
      return true;
    });
  }

  // Build block table rows as per the markdown example
  const rows = [
    ['Hero'],
    [findHeroImage() || ''],
    [findHeroContent().length ? findHeroContent() : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
