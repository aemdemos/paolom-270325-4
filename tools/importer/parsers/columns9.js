export default function parse(element, {document}) {
    // Define the header row matching the example exactly
    const headerRow = ["Columns"];

    // Extract images dynamically
    const images = Array.from(element.querySelectorAll('.cmp-image img')).map(img => img.cloneNode(true));

    // Extract the teaser content dynamically
    const teaserContent = element.querySelector('.cmp-teaser__content');
    const teaserContentClone = teaserContent ? teaserContent.cloneNode(true) : "No content available";

    // Construct table cells dynamically, ensuring proper data extraction
    const cells = [
        headerRow,
        images.length > 0 || teaserContent ? [...images, teaserContentClone] : ["No content available"]
    ];

    // Create the table using the WebImporter helper
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}