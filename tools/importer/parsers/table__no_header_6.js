export default function parse(element, {document}) {
  const rows = [];

  // Create a header row for the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = "Table (no header)";
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract the individual links and text content from the navigation list
  const navList = element.querySelector('.cmp-global-header-right-nav-list');
  if (navList) {
    const items = navList.querySelectorAll('.cmp-global-header-right-nav-list__item');
    items.forEach(item => {
      const link = item.querySelector('a');
      if (link) {
        const linkElement = document.createElement('span');
        linkElement.textContent = link.textContent.trim();
        rows.push([linkElement]);
      }
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}