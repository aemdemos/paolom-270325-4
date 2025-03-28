export default function parse(element, {document}) {
  // Helper table creation utility
  const { createTable } = WebImporter.DOMUtils;

  // Extract the text block content dynamically
  const textBlock = element.querySelector('.text');
  if (!textBlock) {
    console.error('Text block not found');
    return;
  }

  const paragraphs = textBlock.querySelectorAll('p');

  // Create the header row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];

  // Process the paragraphs into table rows, ensuring no empty rows
  const rows = [headerRow];
  paragraphs.forEach((p) => {
    const rowContent = document.createElement('div');
    if (p.innerHTML.trim()) { // Check for non-empty content
      rowContent.innerHTML = p.innerHTML;
      rows.push([rowContent]);
    }
  });

  // Create the block table
  const blockTable = createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}