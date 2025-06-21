/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column that contains the accordions
  // 1. Get the aside column (right side with accordions)
  let aside = element.querySelector('.container__aside, .container__aside__element');
  if (!aside) return;

  // The accordions are inside one or more .expandablecontainer inside aside
  // But only those that contain a .accordion (ignore outer wrappers)
  // So we look for children of .accordion-group > .expandablecontainer
  const accordionGroup = aside.querySelector('.accordion-group');
  if (!accordionGroup) return;

  // Each direct child .expandablecontainer of .accordion-group is an accordion item
  const accordionItems = Array.from(accordionGroup.children).filter(child =>
    child.classList.contains('expandablecontainer') && child.querySelector('.accordion')
  );

  // Prepare the rows for the table
  const rows = [];
  // Header row as per the spec
  rows.push(['Accordion (accordion130)']);

  // For each accordion item, get the title and the content
  accordionItems.forEach(item => {
    // The .accordion__trigger has the h3 > a for the title
    const titleAnchor = item.querySelector('.accordion__trigger h3 a');
    let titleNode;
    if (titleAnchor) {
      titleNode = titleAnchor;
    } else {
      // fallback: use the h3 directly
      const h3 = item.querySelector('.accordion__trigger h3');
      titleNode = h3 || document.createElement('span');
    }

    // The content is everything inside .accordion__content
    const contentNode = item.querySelector('.accordion__content');
    if (!contentNode) return;
    rows.push([titleNode, contentNode]);
  });

  // Create block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
