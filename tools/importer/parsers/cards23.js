export default function parse(element, {document}) {
  // Helper function to extract the relevant share links and buttons
  const extractButtonInfo = (buttonElement) => {
    const links = [];

    const fbShare = buttonElement.querySelector('.fb-share-button iframe');
    if (fbShare) {
      links.push(['Facebook', fbShare.src]);
    }

    const twitterShare = buttonElement.querySelector('.twitter-share-button iframe');
    if (twitterShare) {
      links.push(['Twitter', twitterShare.src]);
    }

    const printButton = document.querySelector('.print .cmp-print-page');
    if (printButton) {
      links.push(['Print', '']);
    }

    const emailShare = document.querySelector('.email-share a');
    if (emailShare) {
      links.push(['Email', emailShare.href]);
    }

    const downloadButton = document.querySelector('.download-button a');
    if (downloadButton) {
      links.push(['Download', downloadButton.href]);
    }

    return links;
  };

  // Extract details
  const sharingLinks = extractButtonInfo(element);

  // Prepare table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Sharing Links';
  const headerRow = [headerCell];

  // Prepare table content rows
  const rows = sharingLinks.map(link => [link[0], link[1]]);

  // Create table
  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}