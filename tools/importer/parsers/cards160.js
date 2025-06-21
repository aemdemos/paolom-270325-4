/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card containers
  const cardContainers = Array.from(
    element.querySelectorAll('.container__item.container__main__element.border.box--white')
  );

  const rows = [['Cards (cards160)']]; // Header row

  cardContainers.forEach((card) => {
    // Find image: inside 'img' of '.image-text .image'
    let img = card.querySelector('.image-text .image img');
    let imageCell = img ? img : '';

    // Find text content: '.image-text .text'
    const textDiv = card.querySelector('.image-text .text');
    const textCell = [];
    if (textDiv) {
      // Title: h3 or h2 (keep as reference)
      const heading = textDiv.querySelector('h3,h2');
      if (heading) textCell.push(heading);
      // Description(s): all <p> except those with only a link
      const paragraphs = textDiv.querySelectorAll('p');
      paragraphs.forEach((p) => {
        // If this paragraph contains only a link, treat as CTA, else as description
        const onlyLink = p.childElementCount === 1 && p.querySelector('a');
        if (!onlyLink) {
          textCell.push(p);
        }
      });
      // CTA: <a> usually in <p>
      const pWithLink = Array.from(paragraphs).find((p) => p.querySelector('a'));
      if (pWithLink && pWithLink.querySelector('a')) {
        textCell.push(pWithLink);
      }
    }

    rows.push([imageCell, textCell.length === 1 ? textCell[0] : textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
