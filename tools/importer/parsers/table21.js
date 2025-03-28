export default function parse(element, {document}) {
    // Extract the header title
    const header = element.querySelector('.cmp-accordion__title');
    const headerText = header ? header.textContent.trim() : '';

    // Extract the image
    const imageElement = element.querySelector('.cmp-image__image');
    const imgSrc = imageElement ? imageElement.getAttribute('src') : '';
    const imgAlt = imageElement ? imageElement.getAttribute('alt') : '';

    // Extract the text content
    const textElement = element.querySelector('.cmp-text');
    const paragraphs = textElement ? textElement.querySelectorAll('p') : [];
    const textContent = Array.from(paragraphs).map(p => p.textContent.trim()).join(' ');

    // Create the new table structure
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Table';
    const cells = [
        [headerCell], // Header row
        [
            document.createTextNode(headerText), 
            (() => {
                const img = document.createElement('img');
                img.setAttribute('src', imgSrc);
                img.setAttribute('alt', imgAlt);
                return img;
            })(), 
            document.createTextNode(textContent)
        ]
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table
    element.replaceWith(block);
}