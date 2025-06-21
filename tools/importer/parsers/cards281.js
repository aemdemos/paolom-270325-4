/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as per example
  const cells = [['Cards (cards281)']];

  // Helper: Get all direct children that are card containers
  const cardNodes = Array.from(
    element.querySelectorAll('.container__item.container__main__element')
  );

  cardNodes.forEach(cardNode => {
    // Image cell: get first <img> inside .image
    let img = null;
    const imgContainer = cardNode.querySelector('.image');
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }

    // Text cell: build array of referenced elements
    const textContainer = cardNode.querySelector('.text');
    const textCellContent = [];
    if (textContainer) {
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) textCellContent.push(heading);
      // All paragraphs, preserve all links and formatting
      textContainer.querySelectorAll('p').forEach(p => {
        textCellContent.push(p);
      });
    }

    // Only add card if both image and text exist
    if (img && textCellContent.length > 0) {
      cells.push([
        img,
        textCellContent
      ]);
    }
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
