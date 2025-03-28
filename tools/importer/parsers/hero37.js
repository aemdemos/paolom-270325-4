export default function parse(element, {document}) {
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Hero';
    const headerRow = [headerCell];

    // Dynamically extract the title from the element
    const titleElement = element.querySelector('.cmp-accordion__title');
    const heading = document.createElement('h1');
    heading.textContent = titleElement ? titleElement.textContent : 'Missing Title';

    // Dynamically extract the image from the element
    const imageElement = element.querySelector('img.cmp-image__image');
    const image = document.createElement('img');
    if (imageElement) {
        image.src = imageElement.src;
        image.alt = imageElement.alt;
    } else {
        image.alt = 'No Image';
    }

    // Create the cells array dynamically
    const cells = [
        headerRow,
        [image, heading]
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}