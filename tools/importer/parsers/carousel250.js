/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const headerRow = ['Carousel (carousel250)'];
  const rows = [];

  // Get the articles list; robust if it's missing
  const ul = element.querySelector('ul.article-list-container');
  if (ul) {
    const lis = ul.querySelectorAll(':scope > li');
    lis.forEach((li) => {
      const article = li.querySelector('article');
      if (!article) return;

      // Image cell: background-image on a div, extract and create <img>
      let imgEl = null;
      const imgDiv = article.querySelector('.article-list-wrapper__item-img-outside');
      if (imgDiv && imgDiv.style && imgDiv.style.backgroundImage) {
        const bg = imgDiv.style.backgroundImage;
        const match = bg.match(/url\(['"]?(.*?)['"]?\)/);
        if (match && match[1]) {
          const img = document.createElement('img');
          img.src = match[1];
          imgEl = img;
        }
      }

      // Text cell: collect content as array, reference original DOM nodes when possible
      const textContent = [];

      // Tag (optional, as a block-level element)
      const tagLink = article.querySelector('.article-list-wrapper__item-tag')?.closest('a');
      if (tagLink && tagLink.textContent.trim()) {
        textContent.push(tagLink);
      }

      // Title (as heading; reference original h3, optionally wrapped in link)
      const titleLink = article.querySelector('.article-list-wrapper__item-link');
      if (titleLink) {
        const h3 = titleLink.querySelector('h3');
        if (h3) {
          // Wrap the referenced h3 in its link if present
          if (titleLink.href) {
            textContent.push(titleLink);
          } else {
            textContent.push(h3);
          }
        }
      }

      // Author line (optional)
      const authorInfoEllipsis = article.querySelector('.article-list-wrapper__item-authorInfoEllipsis');
      if (authorInfoEllipsis && authorInfoEllipsis.textContent.trim()) {
        textContent.push(authorInfoEllipsis);
      }

      // Description (optional, <p> inside .article-list-wrapper__item-description)
      const descDiv = article.querySelector('.article-list-wrapper__item-description');
      if (descDiv) {
        const descP = descDiv.querySelector('p');
        if (descP) {
          textContent.push(descP);
        }
      }

      // Date (optional, for completeness, though not visible in the screenshot)
      const dateDiv = article.querySelector('.article-list-wrapper__item-date');
      if (dateDiv && dateDiv.textContent.trim()) {
        textContent.push(dateDiv);
      }

      // Only add rows where at least image or text is present
      if (imgEl || textContent.length) {
        rows.push([imgEl, textContent]);
      }
    });
  }

  // Only create and replace if there are content rows
  if (rows.length) {
    const cells = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
