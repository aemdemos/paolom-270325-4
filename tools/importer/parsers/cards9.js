/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Cards (cards9)'];
  const cells = [headerRow];

  // Find the UL list containing the cards
  const ul = element.querySelector('ul.article-list-container');
  if (!ul) return;

  // For each card (li)
  ul.querySelectorAll('li.article-list-container__item').forEach((li) => {
    // --- IMAGE CELL ---
    let imageEl = '';
    const imgDiv = li.querySelector('.article-list-wrapper__item-img-outside');
    if (imgDiv && imgDiv.style && imgDiv.style.backgroundImage) {
      const bg = imgDiv.style.backgroundImage;
      const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
      if (match && match[1]) {
        const img = document.createElement('img');
        img.src = match[1];
        img.alt = '';
        imageEl = img;
      }
    }

    // --- TEXT CONTENT CELL ---
    const textContentArr = [];
    const content = li.querySelector('.article-list-wrapper__item-content');
    if (content) {
      // Tag (optional, as paragraph)
      const tag = content.querySelector('.article-list-wrapper__item-tag');
      if (tag && tag.textContent.trim()) {
        const tagP = document.createElement('p');
        tagP.textContent = tag.textContent.trim();
        textContentArr.push(tagP);
      }
      // Title (always as link inside strong inside paragraph)
      const link = content.querySelector('a.article-list-wrapper__item-link');
      if (link) {
        const h3 = link.querySelector('h3');
        if (h3 && h3.textContent.trim()) {
          const strong = document.createElement('strong');
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = h3.textContent.trim();
          strong.appendChild(a);
          const strongP = document.createElement('p');
          strongP.appendChild(strong);
          textContentArr.push(strongP);
        }
      }
      // Author (optional, only if present)
      const author = content.querySelector('.article-list-wrapper__item-authorInfoEllipsis');
      if (author && author.textContent.trim()) {
        const authorP = document.createElement('p');
        authorP.textContent = author.textContent.trim();
        textContentArr.push(authorP);
      }
      // Description (always present)
      const desc = content.querySelector('.article-list-wrapper__item-description-text');
      if (desc && desc.textContent.trim()) {
        const descP = document.createElement('p');
        descP.textContent = desc.textContent.trim();
        textContentArr.push(descP);
      }
      // Date (optional, only if present)
      const date = content.querySelector('.article-list-wrapper__item-date');
      if (date && date.textContent.trim()) {
        const dateP = document.createElement('p');
        dateP.textContent = date.textContent.trim();
        textContentArr.push(dateP);
      }
    }

    cells.push([
      imageEl,
      textContentArr
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
