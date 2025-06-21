/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel wrapper
  const carouselSection = element.querySelector('.compare--cards__section.owl-carousel');
  if (!carouselSection) return;

  // Each carousel slide is inside an .owl-item > .compare--cards__section__column
  let slides = Array.from(carouselSection.querySelectorAll(':scope > .owl-item > .compare--cards__section__column'));
  // Fallback: sometimes structure may miss .owl-item
  if (slides.length === 0) {
    slides = Array.from(carouselSection.querySelectorAll(':scope > .compare--cards__section__column'));
  }
  if (slides.length === 0) return;

  const rows = [['Carousel (carousel5)']];

  slides.forEach((slide) => {
    // First column: image (this structure does not have images, so blank)
    let imageCell = '';

    // Second column: text content
    // Go through all .compare--cards__section__column__row elements
    const subrows = Array.from(slide.querySelectorAll(':scope > .compare--cards__section__column__row'));
    const textContent = [];
    let lastHeading = null;
    subrows.forEach((row) => {
      // Desktop headings are duplicates, ignore them
      const heading = row.querySelector('p.heading:not(.heading--desktop)');
      if (heading && heading.textContent.trim() !== '') {
        // Push previous heading/content pair if exists
        if (lastHeading) {
          textContent.push(lastHeading);
        }
        lastHeading = heading;
        return;
      }
      // Content or description
      const content = row.querySelector('p.rte--body2-regular, p:not(.heading):not(.heading--desktop)');
      if (content && content.textContent.trim() !== '') {
        if (lastHeading) {
          textContent.push(lastHeading);
          lastHeading = null;
        }
        textContent.push(content);
        return;
      }
      // If just a generic <p> (for N/A, etc)
      if (!content && row.children.length === 1 && row.children[0].tagName === 'P' && row.children[0].textContent.trim() !== '') {
        if (lastHeading) {
          textContent.push(lastHeading);
          lastHeading = null;
        }
        textContent.push(row.children[0]);
        return;
      }
    });
    // If last heading is left without content
    if (lastHeading) {
      textContent.push(lastHeading);
    }
    // If nothing, fallback
    const textCell = textContent.length ? textContent : slide;

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
