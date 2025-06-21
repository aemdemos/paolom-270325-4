/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get all immediate card elements
  const cardEls = Array.from(
    element.querySelectorAll('.container__item.container__main__element.border.box--white')
  );

  // Helper function to extract the card data into [image, content]
  function getCardData(cardEl) {
    // Get the area heading (e.g., Queensland)
    let areaHeading = cardEl.querySelector('.text.parbase h3.gamma');
    // Get the .textimage.parbase
    const textimagePar = cardEl.querySelector('.textimage.parbase');
    let imgEl = null;
    let nameHeading = null;
    let descPs = [];
    let cta = null;
    if (textimagePar) {
      const imageText = textimagePar.querySelector('.image-text');
      if (imageText) {
        // Extract the <img>
        const img = imageText.querySelector('img');
        if (img) imgEl = img;
        // Extract the text block
        const textBlock = imageText.querySelector('.text');
        if (textBlock) {
          nameHeading = textBlock.querySelector('h3');
          const ps = Array.from(textBlock.querySelectorAll('p'));
          if (ps.length) {
            // Description paragraphs are those w/o <a>
            descPs = ps.filter(p => !p.querySelector('a'));
            // CTA is first <a> found
            const a = textBlock.querySelector('a');
            if (a) cta = a;
          }
        }
      }
    }
    // Compose the text content for cell 2, referencing original elements
    const contentEls = [];
    if (areaHeading) {
      // Area heading as <h4> for semantic value
      const h4 = document.createElement('h4');
      h4.textContent = areaHeading.textContent.trim();
      contentEls.push(h4);
    }
    if (nameHeading) {
      // Name as <strong> (visually bold in example)
      const strong = document.createElement('strong');
      strong.textContent = nameHeading.textContent.trim();
      contentEls.push(strong);
    }
    descPs.forEach(p => {
      contentEls.push(p);
    });
    if (cta) {
      contentEls.push(cta);
    }
    // Return array for table row: [img, content]
    return [imgEl, contentEls];
  }

  // Table header as in the example
  const rows = [
    ['Cards (cards254)'],
  ];
  // Add each card row
  cardEls.forEach(cardEl => {
    rows.push(getCardData(cardEl));
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
