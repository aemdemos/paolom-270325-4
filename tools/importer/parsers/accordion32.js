export default function parse(element, {document}) {
  // Create the header row matching the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  const rows = [headerRow];

  // Extract all accordion items
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');

  accordionItems.forEach(item => {
    const title = item.querySelector('.cmp-accordion__title');
    const content = item.querySelector('.cmp-accordion__panel');

    let titleText = '';
    if (title && title.textContent.trim()) {
      titleText = title.textContent.trim();
    }

    let contentElements = [];
    if (content) {
      content.childNodes.forEach(child => {
        if (child.nodeType === 1) { // Element node
          contentElements.push(child.cloneNode(true));
        } else if (child.nodeType === 3 && child.textContent.trim()) { // Text node
          const paragraph = document.createElement('p');
          paragraph.textContent = child.textContent.trim();
          contentElements.push(paragraph);
        }
      });
    }

    // Handle edge cases for missing content
    if (!titleText) {
      titleText = 'Untitled Section';
    }
    if (contentElements.length === 0) {
      contentElements.push(document.createTextNode('No content available'));
    }

    rows.push([titleText, contentElements]);
  });

  // Create the block table and replace the original element
  const accordionBlock = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(accordionBlock);
}