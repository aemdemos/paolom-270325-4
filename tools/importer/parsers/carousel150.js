/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block table with the header
  const cells = [
    ['Carousel (carousel150)'],
  ];

  // Find slide image (left cell)
  let imageEl = null;
  const mainContainer = element.querySelector('.container__main');
  if (mainContainer) {
    const img = mainContainer.querySelector('img');
    if (img) {
      imageEl = img;
    }
  }

  // Find text content (right cell)
  let textCell = [];
  const asideContainer = element.querySelector('.container__aside');
  if (asideContainer) {
    const text = asideContainer.querySelector('.text');
    if (text) {
      // Heading
      const heading = text.querySelector('h2, h3, h4, h5, h6');
      if (heading) textCell.push(heading);
      // Paragraphs (skip empty, skip link-para for now)
      text.querySelectorAll('p').forEach(p => {
        if (p.querySelector('a')) return; // CTA handled below
        if (p.textContent && p.textContent.trim().length > 0) {
          textCell.push(p);
        }
      });
      // CTA (link in a p or direct a)
      const cta = text.querySelector('a');
      if (cta) textCell.push(cta);
    }
  }

  // Only add a slide if there's an image
  if (imageEl) {
    cells.push([
      imageEl,
      textCell
    ]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
