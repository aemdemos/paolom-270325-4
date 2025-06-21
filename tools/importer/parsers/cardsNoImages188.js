/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row exactly as in the example
  const rows = [['Cards (cardsNoImages188)']];

  // The block is made up of multiple cards; each is a .container__item in a .container__items container
  // Some .container__items (main/aside) exist; each has .container__item children
  // Each .container__item contains one or more .text.parbase blocks (for headings, images, text, CTAs, etc)
  // Each card's cell should include all content (preserving structure)
  // We must reference existing child elements directly and not clone them

  // Find all containers (main + aside)
  const cardContainers = element.querySelectorAll(':scope > .container__items');
  cardContainers.forEach(container => {
    // For each container, find each .container__item (card)
    const cardItems = container.querySelectorAll(':scope > .aem__component > .container__item');
    cardItems.forEach(item => {
      // Gather all direct .text.parbase children in order
      const textBlocks = item.querySelectorAll(':scope > .text.parbase');
      // Prepare an array to hold all child nodes from those text blocks (without cloning)
      const cardContent = [];
      textBlocks.forEach(txt => {
        // For each .text.parbase, push its children (preserving order and structure)
        Array.from(txt.childNodes).forEach(child => {
          // Only reference element nodes or text nodes that are not just whitespace
          if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim())) {
            cardContent.push(child);
          }
        });
      });
      // If there was content, add as a row
      if (cardContent.length > 0) {
        rows.push([cardContent]);
      }
    });
  });

  // Create the table block as per requirements
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
