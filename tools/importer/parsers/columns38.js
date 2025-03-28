export default function parse(element, {document}) {

  // Extract the title and description from the text block
  const textDiv = element.querySelector('.text');
  const paragraphs = textDiv.querySelectorAll('p');
  const titleParagraph = paragraphs[0];
  const descriptionParagraph = paragraphs[1];

  // Extract the image from the image block
  const imageDiv = element.querySelector('.image');
  const image = imageDiv.querySelector('img');

  // Create the table structure
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const cells = [
    headerRow,
    [
      titleParagraph, // Title paragraph element
      descriptionParagraph, // Description paragraph element
      image // Image element
    ]
  ];

  // Build the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}