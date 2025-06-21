/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the <img> element for the card image
  function getCardImage(mosaicBlock) {
    // The <img> is usually inside: .m__textImage__imageContainer .focuspoint img
    const img = mosaicBlock.querySelector('img');
    return img || undefined;
  }

  // Helper: get all main text for the card (title, date, description)
  function getCardTextContent(mosaicBlock) {
    // Find the main text content container
    const textDiv = mosaicBlock.querySelector('.m__textImage__text > div[data-emptytext]');
    if (!textDiv) return [];
    const nodes = [];
    // Title
    let title = textDiv.querySelector('h3.gamma');
    if (!title) {
      // fallback: first <h3> that is not empty
      const h3s = textDiv.querySelectorAll('h3');
      title = Array.from(h3s).find(h => h.textContent.trim());
    }
    if (title && title.textContent.trim()) {
      nodes.push(title);
    }
    // Date
    let date = null;
    // Often inside a <p> with class paragraph-text--small, possibly has <span class="text--grayscale-45">
    let dateP = textDiv.querySelector('p.paragraph-text--small');
    if (dateP) {
      if (dateP.querySelector('span.text--grayscale-45')) {
        date = dateP;
      } else if (dateP.textContent.trim()) {
        date = dateP;
      }
    } else {
      let span = textDiv.querySelector('span.text--grayscale-45');
      if (span && span.textContent.trim()) {
        // Wrap span in a <p> for consistency
        const p = document.createElement('p');
        p.appendChild(span);
        date = p;
      }
    }
    if (date) {
      nodes.push(date);
    }
    // Description: first <p> after date (that does not have class paragraph-text--small)
    let description = null;
    // Find all <p> (skip date)
    const ps = Array.from(textDiv.querySelectorAll('p'));
    for (const p of ps) {
      // skip date (already pushed)
      if (p === date) continue;
      if (!p.classList.contains('paragraph-text--small')) {
        description = p;
        break;
      }
    }
    if (description && description.textContent.trim()) {
      nodes.push(description);
    }
    // CTA: use card title as link text, use tile__link href if present
    const link = mosaicBlock.querySelector('a.tile__link[href]');
    if (link && link.href && link.href !== '#') {
      const cta = document.createElement('a');
      // Use title text if present, fallback to default
      let linkText = title && title.textContent.trim() ? title.textContent.trim() : 'Read more';
      cta.textContent = linkText;
      cta.href = link.href;
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
      nodes.push(cta);
    }
    return nodes;
  }

  // Find all mosaic blocks (cards)
  // Structure: .mosaic__container > .mosaicblock
  let mosaicContainer = element.querySelector('.mosaic__container');
  let blocks = [];
  if (mosaicContainer) {
    blocks = Array.from(mosaicContainer.querySelectorAll(':scope > .mosaicblock'));
  } else {
    // fallback: any .mosaicblock under element
    blocks = Array.from(element.querySelectorAll('.mosaicblock'));
  }

  // Compose rows: [header, ...cards]
  const rows = [['Cards (cards22)']];
  blocks.forEach(block => {
    const img = getCardImage(block);
    const textContent = getCardTextContent(block);
    // Only add row if both image and text content
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Build table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
