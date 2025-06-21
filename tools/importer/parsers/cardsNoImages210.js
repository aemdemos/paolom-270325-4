/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const cells = [
    ['Cards (cardsNoImages210)']
  ];

  // Get the grid container for the two columns: left (image), right (cards)
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find the aside column that contains the card content (right column)
  const asideColumn = grid.querySelector('.container__items.container__aside');
  if (!asideColumn) return;

  // The actual content is inside .aem__component > .container__item > .box--top
  const boxTop = asideColumn.querySelector('.box--top');
  if (!boxTop) return;

  // All card relevant content is in .text.parbase
  const textContent = boxTop.querySelector('.text.parbase');
  if (!textContent) return;

  // Extract the heading
  const heading = textContent.querySelector('h2, h3, h4, h5, h6');
  if (heading) {
    // Make a new row for the heading card
    cells.push([
      heading
    ]);
  }

  // Get all <p> elements inside textContent (direct children)
  const paragraphs = Array.from(textContent.querySelectorAll(':scope > p'));

  // Find and add the first non-empty paragraph after heading, as description
  let foundDescription = false;
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    // Ignore empty or whitespace-only paragraphs
    if (!p.textContent || !p.textContent.trim()) continue;
    // Skip paragraphs only containing links (as these should be separate cards)
    if (p.querySelector('a') && p.childNodes.length === 1 && p.childNodes[0].tagName === 'A') {
      continue;
    }
    // This is the description paragraph
    cells.push([p]);
    foundDescription = true;
    break;
  }

  // For each link in the paragraphs (except the Explore button), add a row with just that link
  paragraphs.forEach((p) => {
    const links = Array.from(p.querySelectorAll('a'));
    links.forEach((a) => {
      if (a.classList.contains('btn')) return; // skip Explore button
      // Only add if link has non-empty text
      if (a.textContent && a.textContent.trim()) {
        cells.push([a]);
      }
    });
  });

  // Add the Explore more business tools button (if present)
  const exploreBtn = textContent.querySelector('a.btn');
  if (exploreBtn) {
    cells.push([exploreBtn]);
  }

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
