/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the table
  const headerRow = ['Cards (cards144)'];

  // Find the main grid containing the card
  const grid = element.querySelector('.grid');
  if (!grid) return;

  // Find the border box containing the card content
  const cardBox = grid.querySelector('.border.box--pale-blue');
  if (!cardBox) return;

  // Left column (image): .container__items.container__main
  const mainContainer = cardBox.querySelector('.container__items.container__main');
  // Right column (text): .container__items.container__aside
  const asideContainer = cardBox.querySelector('.container__items.container__aside');

  if (!mainContainer || !asideContainer) return;

  // Get image element from the left
  let img = '';
  const mainText = mainContainer.querySelector('.text');
  if (mainText) {
    img = mainText.querySelector('img') || '';
  }

  // Get text content from the right
  const asideText = asideContainer.querySelector('.text');
  const contentEls = [];
  if (asideText) {
    // Heading (h2)
    const heading = asideText.querySelector('h2');
    if (heading) contentEls.push(heading);
    // Add all non-empty paragraphs (except those that only contain a link)
    const paragraphs = Array.from(asideText.querySelectorAll('p')).filter((p) => {
      // Exclude empty paragraphs
      if (p.textContent.trim() === '') return false;
      // Exclude paragraphs that ONLY contain an <a>
      if (p.childElementCount === 1 && p.querySelector('a') && p.textContent.trim() === p.querySelector('a').textContent.trim()) {
        return false;
      }
      return true;
    });
    contentEls.push(...paragraphs);
    // Add CTA link if present (only the <a> itself, not the wrapping <p>)
    const ctaLink = asideText.querySelector('p a');
    if (ctaLink) contentEls.push(ctaLink);
  }

  // Compose table rows
  const rows = [headerRow, [img, contentEls]];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
