/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero image (background/side image) from source HTML
  function getHeroImage() {
    // Prefer hero__bgImage > img
    const img = element.querySelector('.hero__bgImage img');
    if (img) return img;
    // Next prefer any img inside .hero__aside
    const asideImg = element.querySelector('.hero__aside img');
    if (asideImg) return asideImg;
    // As fallback, pick largest img in the hero block
    let maxImg = null, maxArea = 0;
    element.querySelectorAll('img').forEach((img) => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      const area = w * h;
      if (area > maxArea) {
        maxArea = area;
        maxImg = img;
      }
    });
    return maxImg;
  }

  // 2. Gather all visible headline/subheadline/paragraphs in the main hero text zone
  function getHeroTextElems() {
    // Prefer .hero__main__element .text (contains h1, p, etc.)
    let mainTextEl = element.querySelector('.hero__main__element .text')
      || element.querySelector('.hero__main__element')
      || element.querySelector('.hero__main')
      || element;
    // Gather: h1/h2/h3.../p/ul/ol in source order
    const blocks = [];
    mainTextEl.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol').forEach((n) => {
      // Only keep if non-empty
      if (n.textContent.trim()) blocks.push(n);
    });
    // If none found, but text exists, wrap in <p>
    if (blocks.length === 0 && mainTextEl.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = mainTextEl.textContent.trim();
      blocks.push(p);
    }
    return blocks.length === 1 ? blocks[0] : blocks;
  }

  // 3. Build block table as per example: 1 col, 3 rows, header matches exactly
  const tableCells = [
    ['Hero'],
    [getHeroImage() || ''],
    [getHeroTextElems() || '']
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
