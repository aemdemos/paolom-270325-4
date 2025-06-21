/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with the block name
  const rows = [['Cards (cards118)']];

  // Find all direct card elements
  const cardElements = element.querySelectorAll('.container__item.container__main__element');
  cardElements.forEach((card) => {
    // The text container is inside .box--top > .text
    const textContainer = card.querySelector('.box--top .text');
    if (!textContainer) return;
    // Will collect cell content for the card's right cell
    const cellContent = [];

    // 1. Title: h3, or first <p><b><a/></b></p>, or first <p><a/></p> (if styled as title)
    let title = null;
    const h3 = textContainer.querySelector('h3');
    if (h3) {
      title = h3;
    } else {
      // Fallback: a link inside a bold in a p
      const boldLink = textContainer.querySelector('p > b > a');
      if (boldLink && boldLink.parentElement && boldLink.parentElement.parentElement) {
        // Reference the <p> as the title (for semantic block, usually contains only <b><a/>)
        title = boldLink.parentElement.parentElement;
      }
    }
    if (title) cellContent.push(title);

    // 2. Description: first <p> that is not empty, not CTA, and not the title
    let description = null;
    const ps = Array.from(textContainer.querySelectorAll('p'));
    for (let p of ps) {
      if (p.classList.contains('paragraph-text--small')) continue; // Skip CTAs
      if (!p.textContent.trim()) continue; // Skip empty
      if (title && (p === title || p.contains(title) || title.contains(p))) continue; // Skip title
      description = p;
      break;
    }
    if (description) cellContent.push(description);

    // 3. CTA: <p class="paragraph-text--small"><a ...></a></p>
    const cta = textContainer.querySelector('p.paragraph-text--small');
    if (cta) cellContent.push(cta);

    // Data row: two columns, left is empty (no image), right is card content
    rows.push(['', cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
