/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all root-level card columns
  function getCardColumns(root) {
    // Each .container__items (main/aside) is a column
    return Array.from(root.querySelectorAll(':scope > .container__items'));
  }

  // Helper to extract info from a card column
  function extractCard(cardEl) {
    const textimage = cardEl.querySelector('.textimage.parbase');
    if (!textimage) return null;
    const imageText = textimage.querySelector('.image-text');
    if (!imageText) return null;
    const row = [];

    // Image cell
    let imageCell = null;
    const imageDiv = imageText.querySelector('.image');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        imageCell = img;
      } else {
        imageCell = document.createElement('span');
      }
    } else {
      imageCell = document.createElement('span');
    }
    row.push(imageCell);

    // Text cell: heading, description(s), CTA(s)
    const textDiv = imageText.querySelector('.text');
    const textCellContent = [];
    if (textDiv) {
      // Heading (h2 inside textDiv)
      const heading = textDiv.querySelector('h2');
      if (heading) textCellContent.push(heading);
      // Paragraphs (not including heading or CTA links)
      const paragraphs = Array.from(textDiv.querySelectorAll('p'));
      paragraphs.forEach(p => {
        // If p contains a link, treat as CTA and put at the end
        if (p.querySelector('a')) {
          // Keep as is, to maintain markup and semantics
          textCellContent.push(p);
        } else {
          textCellContent.push(p);
        }
      });
    }
    row.push(textCellContent);
    return row;
  }

  const headerRow = ['Cards (cards99)'];

  // Find all cards from both main and aside columns
  const cardColumns = getCardColumns(element);
  const rows = [];
  cardColumns.forEach(container => {
    // Find all .aem__component (there could be multiple cards per column)
    const cards = Array.from(container.querySelectorAll(':scope > .aem__component'));
    cards.forEach(card => {
      const parsed = extractCard(card);
      if (parsed) rows.push(parsed);
    });
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
