/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards101)'];

  // Find the card grid container (for this HTML, there's only 1 card)
  // The .border.box--pale-blue inside .grid is the card container
  let cardRows = [];
  let grid = element.querySelector('.grid');
  if (!grid) grid = element; // fallback

  // To be robust, allow for multiple card containers (just in case)
  let cardContainers = grid.querySelectorAll('.border.box--pale-blue');
  if (cardContainers.length === 0) {
    // fallback: maybe the element itself is the card
    cardContainers = [grid];
  }

  cardContainers.forEach((cardEl) => {
    // First column: image/icon
    let imgCell = '';
    const mainContainer = cardEl.querySelector('.container__items.container__main');
    if (mainContainer) {
      const img = mainContainer.querySelector('img');
      if (img) imgCell = img;
    }

    // Second column: text (heading, description, CTA link)
    let textCellContent = [];
    const asideContainer = cardEl.querySelector('.container__items.container__aside');
    if (asideContainer) {
      const textWrapper = asideContainer.querySelector('.text.parbase');
      if (textWrapper) {
        // Heading
        const heading = textWrapper.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) textCellContent.push(heading);
        // Descriptive paragraphs, skipping ones with only links or empty
        const paragraphs = Array.from(textWrapper.querySelectorAll('p')).filter(p => {
          // Ignore empty, and ignore ones that are only for spacing
          if (p.textContent.trim().length === 0) return false;
          // Ignore paragraphs with only a link (they are handled separately as CTA)
          if (p.children.length === 1 && p.querySelector('a')) return false;
          return true;
        });
        paragraphs.forEach(p => textCellContent.push(p));
        // CTA link: look for a <p> containing an <a>
        const ctaP = Array.from(textWrapper.querySelectorAll('p')).find(p => p.querySelector('a'));
        if (ctaP) textCellContent.push(ctaP);
      }
    }
    cardRows.push([imgCell, textCellContent]);
  });

  // Compose the full cell array
  const tableCells = [headerRow, ...cardRows];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element
  element.replaceWith(table);
}
