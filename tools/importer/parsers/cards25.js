/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table rows array
  const rows = [['Cards (cards25)']]; // Header row, matches spec

  // Find image container and text container
  const imageContainer = element.querySelector('.m__textImage__imageContainer');
  // Robust extraction: select first <img> inside imageContainer
  let image = null;
  if (imageContainer) {
    image = imageContainer.querySelector('img');
  }

  // Text container may have a wrapper div, we want the whole thing (including heading/date/desc)
  const textContainer = element.querySelector('.m__textImage__text');
  let textContent = null;
  if (textContainer) {
    // Use the direct children of textContainer (not the wrapper div)
    // But in this HTML, the wrapper contains all relevant text, so best to reference that wrapper
    const firstChild = textContainer.firstElementChild;
    if (firstChild) {
      textContent = firstChild;
    } else {
      textContent = textContainer;
    }
  }

  // Only add a card row if there is at least an image or text content
  if (image || textContent) {
    rows.push([
      image || '',
      textContent || ''
    ]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
