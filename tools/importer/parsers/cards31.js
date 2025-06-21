/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const rows = [['Cards (cards31)']];

  // Find all .container--tabs (each representing a card)
  const tabContents = Array.from(element.querySelectorAll('.container--tabs'));

  tabContents.forEach(tabContent => {
    // Each card's main content is in: .container__item.container__main__element.none
    // The actual card info is always in a group of 3 .text.parbase blocks inside one of these
    const mainItems = tabContent.querySelectorAll('.container__item.container__main__element.none');
    mainItems.forEach(item => {
      const textBlocks = item.querySelectorAll('.text.parbase');
      if (textBlocks.length === 3) {
        // 1st: title, 2nd: image, 3rd: desc + CTA
        const titleBlock = textBlocks[0];
        const imageBlock = textBlocks[1];
        const descBlock = textBlocks[2];

        // Get the heading element for the title
        const heading = titleBlock.querySelector('h3');
        // Get the image element
        const img = imageBlock.querySelector('img');
        // Description (usually <h3>), and CTA (<p>)
        const desc = descBlock.querySelector('h3');
        const cta = descBlock.querySelector('p');

        // Left cell: img (reference existing element)
        // Right cell: title (strong), desc, cta (all referenced)
        const rightCell = document.createElement('div');
        if (heading) {
          // Use <strong> to match example (bold heading)
          const strong = document.createElement('strong');
          strong.textContent = heading.textContent;
          rightCell.appendChild(strong);
        }
        if (desc) {
          // Description below heading, not heading style
          const descSpan = document.createElement('span');
          descSpan.textContent = desc.textContent;
          rightCell.appendChild(document.createElement('br'));
          rightCell.appendChild(descSpan);
        }
        if (cta) {
          // Add a break then the CTA (button/link in a <p>)
          rightCell.appendChild(document.createElement('br'));
          rightCell.appendChild(cta);
        }
        // Compose the row
        rows.push([
          img,
          rightCell
        ]);
      }
    });
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
