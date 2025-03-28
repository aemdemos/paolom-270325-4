export default function parse(element, {document}) {
  // Extract relevant content dynamically
  const toolbarTitle = element.querySelector('.fc-toolbar-title');
  const titleText = toolbarTitle ? toolbarTitle.textContent.trim() : '';

  const buttonsGroups = element.querySelectorAll('.fc-toolbar-chunk .fc-button-group');
  const groupedButtons = Array.from(buttonsGroups).map(group => {
    const buttons = Array.from(group.querySelectorAll('.fc-button')).map(button => button.textContent.trim()).filter(text => text);
    return buttons.length ? buttons.join(', ') : null;
  }).filter(group => group !== null); // Filter out empty groups

  // Create header row exactly matching the example
  const headerRow = ['Embed'];

  // Create content row dynamically
  const contentRow = [
    titleText,
    groupedButtons.join('\n') // Properly join grouped buttons with separation
  ];

  // Generate table cells
  const cells = [
    headerRow,
    contentRow
  ];

  // Create table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}