/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract the image from the left column, if it exists
  let img = null;
  const mainImg = element.querySelector('.container__main .image img');
  if (mainImg) img = mainImg;

  // 2. Extract the right column's block (heading, paragraphs, CTA)
  const aside = element.querySelector('.container__aside .text');
  let contentArr = [];
  if (aside) {
    // Heading (could be h1, h2, h3, etc.)
    const heading = aside.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentArr.push(heading);

    // Paragraphs (only those with meaningful content)
    const paragraphs = Array.from(aside.querySelectorAll('p')).filter((p) => {
      // Skip <p> containing only the CTA
      return !(p.childElementCount === 1 && p.querySelector('a.btn'));
    });
    if (paragraphs.length > 0) contentArr.push(...paragraphs);

    // CTA button (always include, even if it's inside a p)
    const cta = aside.querySelector('a.btn');
    if (cta) contentArr.push(cta);
  }

  // 3. Compose the rows according to table structure: 3 rows, exactly as in the example
  //    Row 1: "Hero" (header, as in the markdown example)
  //    Row 2: Image (optional, can be empty string if not present)
  //    Row 3: Heading, paragraphs, CTA (optional, can be empty string if not present)
  const tableRows = [
    ['Hero'],
    [img ? img : ''],
    [contentArr.length > 0 ? contentArr : '']
  ];

  // 4. Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // 5. Replace the element with the block table
  element.replaceWith(block);
}
