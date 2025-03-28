export default function parse(element, {document}) {
    const rows = [];

    // Add the header row with the block name
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards (no images)';
    const headerRow = [headerCell];
    rows.push(headerRow);

    // Extract card elements
    const cardElements = element.querySelectorAll('.cmp-text');
    cardElements.forEach((card) => {
        const cell = [];
        const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
        const description = card.querySelector('p');

        if (heading) {
            const headingElem = document.createElement('strong');
            headingElem.textContent = heading.textContent;
            cell.push(headingElem);
        }

        if (description) {
            const descriptionElem = document.createElement('p');
            descriptionElem.innerHTML = description.innerHTML;
            cell.push(descriptionElem);
        }

        rows.push([cell]);
    });

    // Create the table block
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
}