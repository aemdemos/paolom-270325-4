/* global WebImporter */
export default function parse(element, { document }) {
  // Find both columns
  const containers = element.querySelectorAll(':scope > .container__items');
  let leftContent = null, rightContent = null;
  for (const cont of containers) {
    if (cont.classList.contains('container__main')) {
      const inner = cont.querySelector('.aem__component > .container__item');
      leftContent = inner || cont;
    }
    if (cont.classList.contains('container__aside')) {
      const inner = cont.querySelector('.aem__component > .container__item');
      rightContent = inner || cont;
    }
  }
  if (!leftContent) leftContent = containers[0] || document.createElement('div');
  if (!rightContent) rightContent = containers[1] || document.createElement('div');

  // The header row must be a single column (one cell), matching the example
  const headerRow = ['Columns (columns222)'];
  // The content row is two columns
  const contentRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
