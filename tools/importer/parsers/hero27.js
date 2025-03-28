export default function parse(element, { document }) {
    const tableCells = [];

    // Header Row containing the block name
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Hero';
    const headerRow = [headerCell];
    tableCells.push(headerRow);

    // Extracting data from element
    const imageElement = element.querySelector('.cmp-teaser__image img');
    const titleElement = element.querySelector('.cmp-teaser__title');
    const descriptionElement = element.querySelector('.cmp-teaser__description p');

    // Background Image
    const backgroundImage = document.createElement('img');
    if (imageElement) {
        backgroundImage.src = imageElement.src;
        backgroundImage.alt = imageElement.alt || '';
    }

    // Title styled as Heading
    const heading = document.createElement('h1');
    if (titleElement && titleElement.textContent.trim() !== '') {
        heading.textContent = titleElement.textContent.trim();
    } else {
        heading.textContent = 'Title Missing';
    }

    // Description
    const description = document.createElement('p');
    if (descriptionElement && descriptionElement.innerHTML.trim() !== '') {
        description.innerHTML = descriptionElement.innerHTML;
    } else {
        description.textContent = 'Description Missing';
    }

    // Content Row
    const contentRow = [];
    if (backgroundImage.src) contentRow.push(backgroundImage);
    if (heading.textContent && heading.textContent !== 'Title Missing') contentRow.push(heading);
    if (description.textContent !== 'Description Missing' || description.innerHTML.trim() !== '') contentRow.push(description);
    tableCells.push(contentRow);

    // Create block table
    const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

    // Replace element with new block table
    element.replaceWith(blockTable);
}