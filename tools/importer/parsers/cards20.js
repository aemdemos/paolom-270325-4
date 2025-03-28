export default function parse(element, {document}) {
    const blockName = ['Cards'];

    // Extract the image
    const image = element.querySelector('img');
    let imageElement = null;
    if (image) {
        imageElement = document.createElement('img');
        imageElement.src = image.src;
        imageElement.alt = image.alt || '';
    }

    // Extract the heading
    const heading = element.querySelector('.cmp-card__heading p');
    const title = document.createElement('strong');
    if (heading) {
        title.textContent = heading.textContent.trim();
    }

    // Extract the subheading
    const subHeading = element.querySelector('.cmp-card__heading h2');
    const subHeadingElement = document.createElement('p');
    if (subHeading) {
        subHeadingElement.textContent = subHeading.textContent.trim();
    }

    // Extract the description paragraphs
    const description = element.querySelector('.cmp-card--expandable__content');
    const paragraphs = [];
    if (description) {
        Array.from(description.querySelectorAll('p')).forEach(p => {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = p.innerHTML.trim();
            paragraphs.push(paragraph);
        });
    }

    // Extract the button
    const button = element.querySelector('.button .cmp-button');
    const buttonElement = document.createElement('a');
    if (button) {
        buttonElement.href = '#';
        buttonElement.textContent = button.querySelector('.cmp-button__text')?.textContent.trim() || '';
    }

    // Create content cell
    const contentCell = [title, subHeadingElement, ...paragraphs];
    if (buttonElement.textContent) {
        contentCell.push(buttonElement);
    }

    // Create table cells
    const cells = [
        blockName,
        [imageElement, contentCell],
    ];

    // Create and replace the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}