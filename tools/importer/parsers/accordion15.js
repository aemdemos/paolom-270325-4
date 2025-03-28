export default function parse(element, {document}) {
  // Helper function to extract content from accordion items
  const extractAccordionContent = (accordionItem) => {
    const title = accordionItem.querySelector('.cmp-accordion__title')?.textContent.trim() || '';
    const panel = accordionItem.querySelector('.cmp-accordion__panel');

    let contentCell;
    if (panel) {
      const content = panel.innerHTML.trim();
      contentCell = document.createElement('div');
      contentCell.innerHTML = content;
    } else {
      contentCell = document.createTextNode('');
    }

    return [title, contentCell];
  };

  // Extracting accordion items
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');

  // Creating header row for block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  // Extracting content rows
  const rows = Array.from(accordionItems).map(extractAccordionContent);

  // Adding header row to the table
  const cells = [headerRow, ...rows];

  // Creating block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the block table
  element.replaceWith(blockTable);
}