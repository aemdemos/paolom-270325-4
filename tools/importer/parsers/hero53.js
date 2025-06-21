/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image in the left/main section
  let img = element.querySelector('.container__main img');
  // May be absent, so handle gracefully
  if (!img) img = '';

  // Find the main hero content in the aside section
  let asideText = '';
  const aside = element.querySelector('.container__aside');
  if (aside) {
    // The interesting content is inside .text
    const content = aside.querySelector('.text');
    if (content) asideText = content;
  }

  const rows = [
    ['Hero'],
    [img],
    [asideText]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
