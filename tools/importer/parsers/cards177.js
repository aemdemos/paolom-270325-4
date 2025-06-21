/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header as in the example
  const headerRow = ['Cards (cards177)'];
  const rows = [headerRow];

  // Find all .container__items top-level direct children (each column of cards)
  const containers = Array.from(element.querySelectorAll(':scope > div'));
  containers.forEach((container) => {
    // Find all .container__item inside this container (should be just one per container for this layout, but could be more in other variants)
    const items = Array.from(container.querySelectorAll('.container__item'));
    items.forEach((item) => {
      // Find .box--top under .container__item
      const topBox = item.querySelector('.box--top');
      if (!topBox) return;
      const textSection = topBox.querySelector('.text.parbase');
      if (!textSection) return;

      // 1. Image: first <img> inside .text.parbase (inside first h3)
      let imgEl = textSection.querySelector('img');

      // 2. Title: the <h3> element without img (usually second h3, or only if there's no img)
      const h3s = textSection.querySelectorAll('h3');
      let titleEl = null;
      if (h3s.length > 1) {
        titleEl = h3s[1];
      } else if (h3s.length === 1 && !imgEl) {
        titleEl = h3s[0];
      }

      // 3. Description: first <p>
      const descEl = textSection.querySelector('p');

      // 4. CTA: second <p> if present and contains a link
      const ps = textSection.querySelectorAll('p');
      let ctaEl = null;
      if (ps.length > 1 && ps[1].querySelector('a')) {
        ctaEl = ps[1];
      }

      // Assemble right cell: [title, desc, cta] (filter out nulls)
      const textCell = [];
      if (titleEl) textCell.push(titleEl);
      if (descEl) textCell.push(descEl);
      if (ctaEl) textCell.push(ctaEl);

      // Add row to table
      rows.push([
        imgEl || '',
        textCell
      ]);
    });
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
