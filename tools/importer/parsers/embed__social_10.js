export default function parse(element, {document}) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract the link and image from the original element
    const logoLink = element.querySelector('.cmp-agency-footer__logo');
    const logoImage = logoLink?.querySelector('img');

    // Handle edge cases for missing elements or attributes
    const logoURL = logoLink?.href || 'URL not available';
    const imageSrc = logoImage?.src || 'Image not available';
    const imageAlt = logoImage?.alt || 'Alt text not available';

    // Create the header row specifically for the "Embed" block type
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Embed';
    const headerRow = [headerCell];

    // Create the table cells in the specified format
    const cells = [
      headerRow, // Header row indicating the block type
      [`<a href="${logoURL}">${logoURL}</a>`],
      [`<img src="${imageSrc}" alt="${imageAlt}"/>`]
    ];

    // Create a table block using the helper function
    const blockTable = createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}