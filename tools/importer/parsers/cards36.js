/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as per requirement
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // The cards are <li>s under the right <ul>
  const ul = element.querySelector('ul.article-list-container');
  if (!ul) return;

  ul.querySelectorAll('li.article-list-container__item').forEach((li) => {
    // First cell: extract image (from background-image)
    let imageCell = '';
    const imgDiv = li.querySelector('.article-list-wrapper__item-img-outside');
    if (imgDiv && imgDiv.style.backgroundImage) {
      const bgUrl = imgDiv.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (bgUrl && bgUrl[1]) {
        const img = document.createElement('img');
        img.src = bgUrl[1];
        // Use the card heading as alt text if possible
        const h3 = li.querySelector('h3');
        img.alt = h3 && h3.textContent ? h3.textContent.trim() : '';
        imageCell = img;
      }
    }

    // Second cell: text content (tag, title, description, CTA)
    const contentDiv = li.querySelector('.article-list-wrapper__item-content');
    const textContent = [];

    // Tag (optional, styled as a pill)
    const tagDiv = contentDiv && contentDiv.querySelector('.article-list-wrapper__item-tag');
    if (tagDiv && tagDiv.textContent.trim()) {
      const tagEl = document.createElement('p');
      tagEl.textContent = tagDiv.textContent.trim();
      textContent.push(tagEl);
    }

    // Title (mandatory, link if possible, h3 semantics)
    let titleEl = null;
    const titleLink = contentDiv && contentDiv.querySelector('a.article-list-wrapper__item-link');
    const h3 = titleLink && titleLink.querySelector('h3');
    if (h3) {
      if (titleLink && titleLink.href) {
        const a = document.createElement('a');
        a.href = titleLink.href;
        a.textContent = h3.textContent.trim();
        // Keep h3 semantics for accessibility
        const h3el = document.createElement('h3');
        h3el.appendChild(a);
        titleEl = h3el;
      } else {
        const h3el = document.createElement('h3');
        h3el.textContent = h3.textContent.trim();
        titleEl = h3el;
      }
      textContent.push(titleEl);
    }

    // Description (optional)
    const descDiv = contentDiv && contentDiv.querySelector('.article-list-wrapper__item-description');
    const descP = descDiv && descDiv.querySelector('.article-list-wrapper__item-description-text');
    if (descP && descP.textContent.trim()) {
      // Use the existing <p> directly if possible
      textContent.push(descP);
    }

    // No CTA in this block example, but if there was a link at the bottom, include it here
    // (not present in given HTML)

    rows.push([imageCell, textContent]);
  });

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
