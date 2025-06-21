/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly
  const headerRow = ['Cards (cards112)'];

  // Get all cards: divs with class 'container__item container__main__element border'
  const cards = Array.from(element.querySelectorAll('.container__item.container__main__element.border'));
  
  const rows = [headerRow];

  cards.forEach(card => {
    // First column: image/icon, none in this HTML, so empty string
    let imgCell = '';

    // Second column: text content
    let textCell = '';
    const boxTop = card.querySelector('.box--top');
    if (boxTop) {
      const textParbase = boxTop.querySelector('.text.parbase');
      if (textParbase) {
        // Build a fragment with all non-empty children (retain structure, no clones)
        // We want to reference the actual children of textParbase, filtering out empty <p>
        const children = Array.from(textParbase.children);
        // Remove empty <p> (with no text and no <a> inside)
        const goodChildren = children.filter(child => {
          if (child.tagName === 'P' && !child.textContent.trim() && !child.querySelector('a')) return false;
          return true;
        });
        // If only one child, use it directly, otherwise use array
        textCell = goodChildren.length === 1 ? goodChildren[0] : goodChildren;
      }
    }
    rows.push([imgCell, textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
