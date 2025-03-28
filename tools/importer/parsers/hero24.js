export default function parse(element, {document}) {
    // Helper function to create a table
    const createTable = WebImporter.DOMUtils.createTable;

    // Extracting the title from the button
    const button = element.querySelector('button');
    const title = button ? button.querySelector('.cmp-accordion__title')?.textContent.trim() : '';

    // Creating header row
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Hero';

    // Creating content row
    const contentRow = [
        document.createElement('div')
    ];

    // Adding title to content row as a heading
    if (title) {
        const heading = document.createElement('h1');
        heading.textContent = title;
        contentRow[0].appendChild(heading);
    }

    // Constructing the table
    const cells = [
        headerRow, // Header row
        contentRow // Content row
    ];

    const blockTable = createTable(cells, document);

    // Replacing the original element
    element.replaceWith(blockTable);
}