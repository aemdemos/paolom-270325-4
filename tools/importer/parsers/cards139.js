/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as per the spec
  const headerRow = ['Cards (cards139)'];
  const cells = [headerRow];

  // Select all card containers (cards)
  const cardElements = element.querySelectorAll('.container__item.container__main__element');

  cardElements.forEach((cardEl) => {
    // First cell: Image
    let imageCell = '';
    const imageDiv = cardEl.querySelector('.image');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) imageCell = img;
    }

    // Second cell: Text content
    let textCellContent = [];
    const textBlock = cardEl.querySelector('.text');
    if (textBlock) {
      // Heading (h3/h2/h1), if any
      const heading = textBlock.querySelector('h1, h2, h3');
      if (heading) textCellContent.push(heading);
      // Description paragraphs (skip those with only CTA button)
      const paragraphs = Array.from(textBlock.querySelectorAll('p'));
      paragraphs.forEach((p) => {
        const onlyBtn = p.querySelector('a.btn') && (p.childNodes.length === 1 || p.textContent.trim() === '');
        if (!onlyBtn && p.textContent.trim()) {
          textCellContent.push(p);
        }
      });
      // CTA button (link with class btn)
      const cta = textBlock.querySelector('a.btn');
      if (cta) textCellContent.push(cta);
    }
    if (textCellContent.length === 0 && textBlock) {
      textCellContent = [textBlock];
    }
    // If no text at all, leave empty string
    if (textCellContent.length === 0) textCellContent = [''];

    cells.push([imageCell, textCellContent]);
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
