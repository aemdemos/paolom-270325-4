export default function parse(element, {document}) {
    // Define the header row with block name
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Accordion';

    // Extract relevant content from the element
    const buttonGroup = element.querySelector('.button-group');
    const label = buttonGroup.querySelector('label');
    const select = buttonGroup.querySelector('select');

    const rows = [];

    // Ensure we have relevant title and content for the accordion
    if (label && select) {
        const title = document.createElement('span');
        title.textContent = label.textContent.trim(); // Dynamic extraction of label text

        const content = document.createElement('div');
        content.appendChild(select.cloneNode(true)); // Clone the select element to avoid mutating the original

        rows.push([title, content]);
    }

    // Create the cells array
    const cells = [headerRow, ...rows];

    // Create the table block using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}