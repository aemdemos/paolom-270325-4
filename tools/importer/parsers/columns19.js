export default function parse(element, {document}) {
  // Extract and dynamically handle content
  const addressElement = element.querySelector('.cmp-agency-footer__address');
  const linksElement = element.querySelector('.cmp-agency-footer__links .cmp-text');
  const socialElements = Array.from(element.querySelectorAll('.cmp-social-share__button'));

  // Handle edge cases for missing elements
  const addressContent = addressElement ? addressElement.innerHTML.trim() : '';
  const cellPhoneLink = linksElement ? linksElement.querySelector('a[href^="tel:"]') : null;
  const emailLink = linksElement ? linksElement.querySelector('a[href^="mailto:"]') : null;

  const cellPhone = cellPhoneLink ? cellPhoneLink.textContent.trim() : 'N/A';
  const email = emailLink ? emailLink.textContent.trim() : 'N/A';

  const socialLinks = socialElements.map((socialEl) => {
    const link = socialEl.href || '';
    const title = socialEl.title || 'Social Link';
    const linkEl = document.createElement('a');
    linkEl.href = link;
    linkEl.textContent = title;
    return linkEl;
  });

  // Create Header row
  const headerRow = ['Columns'];

  // Create Content rows dynamically
  const addressDiv = document.createElement('div');
  if (addressElement) {
    addressDiv.innerHTML = addressElement.innerHTML; // Render innerHTML directly
  }

  const addressRow = [addressDiv];

  const contactRow = [
    `Cell: ${cellPhone}`,
    `Email: ${email}`,
  ];

  const socialRow = socialLinks;

  const cells = [headerRow, addressRow, contactRow, socialRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}