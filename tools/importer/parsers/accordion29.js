export default function parse(element, {document}) {
  // Helper function to extract accordion items
  const extractAccordionItems = (accordionContainer) => {
    const items = [];

    Array.from(accordionContainer.querySelectorAll('.cmp-accordion__item')).forEach((item) => {
      const titleElement = item.querySelector('.cmp-accordion__title');
      const contentElement = item.querySelector('.cmp-accordion__panel');

      if (titleElement && contentElement) {
        const title = titleElement.textContent.trim();
        const content = document.createElement('div');
        content.innerHTML = contentElement.innerHTML.trim();
        items.push([title, content]);
      }
    });

    return items;
  };

  // Extract accordion items
  const accordionItems = extractAccordionItems(element);

  // Create header row matching the example exactly
  const headerRow = ['Accordion'];

  // Create cells array for the table
  const cells = [headerRow, ...accordionItems];

  // Create block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}