/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inpage navigation block
  const nav = element.querySelector('.cp-inpage-nav');
  if (!nav) return;
  const tileType = nav.querySelector('.inpage-nav--tile-type');
  if (!tileType) return;
  const ul = tileType.querySelector('ul');
  if (!ul) return;

  // Get all card items
  const listItems = Array.from(ul.children).filter(li => li.matches('li'));
  const headerRow = ['Cards (cardsNoImages29)'];
  const cells = [headerRow];

  listItems.forEach((li) => {
    // Each card row
    const a = li.querySelector('a');
    if (!a) return;
    // Get the card title and preserve semantics
    let cardElements = [];
    // Try to find a title
    const titleDiv = a.querySelector('.inpage-nav__link-text');
    if (titleDiv) {
      // Use <strong> to represent the card title
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      cardElements.push(strong);
    }
    // No description in source, but if there was other content under the title, get it (future-proof)
    // For this HTML all info is in the title
    // Add a link as CTA at the bottom, referencing the existing <a> element
    // Remove any embedded SVG/icon from the link (but keep the original element for reference, as per instructions)
    Array.from(a.querySelectorAll('svg, .arrow_right')).forEach(e => e.remove());
    // To avoid rewriting the link, reference the existing <a> element, but clean up
    a.removeAttribute('aria-label');
    a.removeAttribute('style');
    // Remove inpage-nav__link-content, if any, from the link so it contains only the text
    Array.from(a.querySelectorAll('.inpage-nav__link-content')).forEach(e => e.remove());
    // If titleDiv was present, set the link text to just the title (to avoid blanks)
    if (titleDiv) {
      a.textContent = titleDiv.textContent.trim();
    } else {
      a.textContent = a.textContent.trim();
    }
    // Only add <br> if there's both a title and CTA (for consistent structure)
    if (cardElements.length > 0) {
      cardElements.push(document.createElement('br'));
    }
    cardElements.push(a);
    cells.push([cardElements]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
