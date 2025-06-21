/* global WebImporter */
export default function parse(element, { document }) {
  // Find all carousel slide wrappers
  const slides = Array.from(element.querySelectorAll(':scope .container__item.container__main__element'));

  // Compose each slide row: [image, text content]
  const rows = slides.map((slide) => {
    // Get the first <img> inside .video__container
    const img = slide.querySelector('.video__container img');
    // Compose all visual text content in the overlay, as seen on cards
    let textContent = null;
    const overlay = slide.querySelector('.video__overlay');
    if (overlay) {
      const info = overlay.querySelector('.video__info');
      if (info) {
        // We want to preserve the presentation: title as heading, then timing as paragraph
        const frag = document.createDocumentFragment();
        // Title
        const titleSpan = info.querySelector('.video__title');
        if (titleSpan && titleSpan.childNodes.length > 0) {
          const heading = document.createElement('h3');
          heading.textContent = titleSpan.childNodes[0].textContent.trim();
          frag.appendChild(heading);
        }
        // Video duration
        const lenSpan = info.querySelector('.video__length');
        if (lenSpan && lenSpan.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = lenSpan.textContent.trim();
          frag.appendChild(p);
        }
        // Only use the fragment if it contains something
        textContent = frag.childNodes.length ? frag : '';
      }
    }
    if (!img) return null;
    return [img, textContent];
  }).filter(Boolean);

  // Table header as per spec
  const cells = [
    ['Carousel (carousel51)'],
    ...rows
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
