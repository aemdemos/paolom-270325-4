/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract background image from style
  let imageElem = '';
  const imageDiv = element.querySelector('.hero__image');
  if (imageDiv && imageDiv.style.backgroundImage) {
    const bgMatch = imageDiv.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
    if (bgMatch && bgMatch[1]) {
      imageElem = document.createElement('img');
      imageElem.src = bgMatch[1];
      imageElem.alt = '';
    }
  }
  
  // Step 2: Extract heading and subheading (content)
  const contentArr = [];
  const contentCol = element.querySelector('.hero__columnContent, .hero__columnContent--topic');
  if (contentCol) {
    const heading = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentArr.push(heading);
    const para = contentCol.querySelector('p');
    if (para) contentArr.push(para);
  }

  // Build table following example: header, image, content
  const cells = [
    ['Hero'],
    [imageElem ? imageElem : ''],
    [contentArr.length ? contentArr : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
