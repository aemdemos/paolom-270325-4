/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards284) header
  const headerRow = ['Cards (cards284)'];
  const rows = [headerRow];

  // Find all cards: the .container__item.container__main__element elements
  const cardNodes = element.querySelectorAll('.container__item.container__main__element');

  cardNodes.forEach(card => {
    // Each card's content is in the .textimage .text element
    const textContainer = card.querySelector('.textimage .text');
    // Defensive: If no textContainer, skip this card
    if (!textContainer) return;

    // 1. Image: find first <img> in the textContainer
    const imgEl = textContainer.querySelector('img') || '';

    // 2. Heading: <h3> or <h2>, prefer <h3>
    let headingEl = textContainer.querySelector('h3');
    if (!headingEl) headingEl = textContainer.querySelector('h2');

    // 3. Description: first <p> after heading (not containing img, not empty)
    let descEl = null;
    if (headingEl) {
      let found = false;
      for (const child of textContainer.children) {
        if (child === headingEl) {
          found = true;
          continue;
        }
        if (found && child.tagName === 'P' && !child.querySelector('img') && child.textContent.trim()) {
          descEl = child;
          break;
        }
      }
    }

    // 4. CTA: first <a href> in textContainer
    const ctaEl = textContainer.querySelector('a[href]') || '';

    // Compose the content cell
    const contentCell = [];
    if (headingEl) contentCell.push(headingEl);
    if (descEl) contentCell.push(descEl);
    if (ctaEl) contentCell.push(ctaEl);

    // Add the row for this card
    rows.push([imgEl, contentCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
