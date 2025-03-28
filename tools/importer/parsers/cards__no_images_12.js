export default function parse(element, {document}) {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Cards (no images)';

    const cells = [
        headerRow,
    ];

    const heading = element.querySelector('.cmp-card__heading h2');
    const listItems = element.querySelectorAll('.cmp-card__heading ul li');

    if (heading || listItems.length > 0) {
        const contentRow = [];

        if (heading) {
            const headingEl = document.createElement('strong');
            headingEl.textContent = heading.textContent;
            contentRow.push(headingEl);
        }

        listItems.forEach((li) => {
            const paragraph = document.createElement('p');
            paragraph.textContent = li.textContent;
            contentRow.push(paragraph);
        });

        cells.push([contentRow]);
    }

    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}