/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards152)'];
  const rows = [headerRow];

  // Select all card elements: .container__item.container__main__element
  const cardElements = element.querySelectorAll('.container__item.container__main__element');

  cardElements.forEach((card) => {
    // Find the image (must be the img tag inside the first p of the card)
    let img = null;
    const imgPara = card.querySelector('p > img')?.parentElement;
    if (imgPara && imgPara.querySelector('img')) {
      img = imgPara.querySelector('img');
    }
    
    // Get the heading (h3 is used in this HTML)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    
    // Gather description paragraphs: after the heading but before the CTA
    // All p's except:
    //   - any p that contains the image
    //   - any p that contains a link (CTA)
    const allParas = Array.from(card.querySelectorAll('p'));
    let descriptionParas = [];
    let ctaPara = null;
    allParas.forEach((p) => {
      if (p.querySelector('img')) return; // skip image p
      const a = p.querySelector('a');
      if (a) {
        ctaPara = p;
      } else {
        descriptionParas.push(p);
      }
    });

    // Compose text cell (heading, description, CTA)
    const textCell = [];
    if (heading) textCell.push(heading);
    descriptionParas.forEach((p) => textCell.push(p));
    if (ctaPara) textCell.push(ctaPara);

    rows.push([
      img,
      textCell.length === 1 ? textCell[0] : textCell // collapse if only one
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
