/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import hero4Parser from './parsers/hero4.js';
import cards3Parser from './parsers/cards3.js';
import accordion10Parser from './parsers/accordion10.js';
import columns7Parser from './parsers/columns7.js';
import cardsNoImages15Parser from './parsers/cardsNoImages15.js';
import columns13Parser from './parsers/columns13.js';
import accordion16Parser from './parsers/accordion16.js';
import tabs20Parser from './parsers/tabs20.js';
import cards9Parser from './parsers/cards9.js';
import columns8Parser from './parsers/columns8.js';
import cardsNoImages21Parser from './parsers/cardsNoImages21.js';
import tableBordered23Parser from './parsers/tableBordered23.js';
import columns6Parser from './parsers/columns6.js';
import carousel5Parser from './parsers/carousel5.js';
import columns17Parser from './parsers/columns17.js';
import cards25Parser from './parsers/cards25.js';
import accordion11Parser from './parsers/accordion11.js';
import columns27Parser from './parsers/columns27.js';
import hero26Parser from './parsers/hero26.js';
import hero32Parser from './parsers/hero32.js';
import accordion30Parser from './parsers/accordion30.js';
import cards22Parser from './parsers/cards22.js';
import columns28Parser from './parsers/columns28.js';
import cards36Parser from './parsers/cards36.js';
import columns1Parser from './parsers/columns1.js';
import hero41Parser from './parsers/hero41.js';
import video34Parser from './parsers/video34.js';
import tableNoHeader42Parser from './parsers/tableNoHeader42.js';
import columns43Parser from './parsers/columns43.js';
import columns44Parser from './parsers/columns44.js';
import accordion40Parser from './parsers/accordion40.js';
import cards31Parser from './parsers/cards31.js';
import columns48Parser from './parsers/columns48.js';
import tabs35Parser from './parsers/tabs35.js';
import hero53Parser from './parsers/hero53.js';
import columns19Parser from './parsers/columns19.js';
import accordion45Parser from './parsers/accordion45.js';
import columns46Parser from './parsers/columns46.js';
import embedSocial47Parser from './parsers/embedSocial47.js';
import tableStripedBordered57Parser from './parsers/tableStripedBordered57.js';
import hero59Parser from './parsers/hero59.js';
import carousel51Parser from './parsers/carousel51.js';
import columns39Parser from './parsers/columns39.js';
import hero60Parser from './parsers/hero60.js';
import hero55Parser from './parsers/hero55.js';
import columns58Parser from './parsers/columns58.js';
import cardsNoImages29Parser from './parsers/cardsNoImages29.js';
import tabs18Parser from './parsers/tabs18.js';
import columns66Parser from './parsers/columns66.js';
import columns64Parser from './parsers/columns64.js';
import hero63Parser from './parsers/hero63.js';
import cards69Parser from './parsers/cards69.js';
import columns56Parser from './parsers/columns56.js';
import cardsNoImages65Parser from './parsers/cardsNoImages65.js';
import accordion72Parser from './parsers/accordion72.js';
import accordion67Parser from './parsers/accordion67.js';
import columns62Parser from './parsers/columns62.js';
import columns74Parser from './parsers/columns74.js';
import columns77Parser from './parsers/columns77.js';
import hero75Parser from './parsers/hero75.js';
import columns70Parser from './parsers/columns70.js';
import columns78Parser from './parsers/columns78.js';
import tabs73Parser from './parsers/tabs73.js';
import cards38Parser from './parsers/cards38.js';
import columns82Parser from './parsers/columns82.js';
import cards84Parser from './parsers/cards84.js';
import cardsNoImages86Parser from './parsers/cardsNoImages86.js';
import columns87Parser from './parsers/columns87.js';
import columns85Parser from './parsers/columns85.js';
import columns54Parser from './parsers/columns54.js';
import accordion88Parser from './parsers/accordion88.js';
import columns81Parser from './parsers/columns81.js';
import columns89Parser from './parsers/columns89.js';
import cards94Parser from './parsers/cards94.js';
import columns91Parser from './parsers/columns91.js';
import cards96Parser from './parsers/cards96.js';
import cardsNoImages76Parser from './parsers/cardsNoImages76.js';
import cards97Parser from './parsers/cards97.js';
import accordion80Parser from './parsers/accordion80.js';
import cards99Parser from './parsers/cards99.js';
import hero100Parser from './parsers/hero100.js';
import cards101Parser from './parsers/cards101.js';
import cards103Parser from './parsers/cards103.js';
import cards95Parser from './parsers/cards95.js';
import columns92Parser from './parsers/columns92.js';
import cards104Parser from './parsers/cards104.js';
import cards106Parser from './parsers/cards106.js';
import columns107Parser from './parsers/columns107.js';
import cards109Parser from './parsers/cards109.js';
import columns108Parser from './parsers/columns108.js';
import columns98Parser from './parsers/columns98.js';
import columns110Parser from './parsers/columns110.js';
import columns111Parser from './parsers/columns111.js';
import cards112Parser from './parsers/cards112.js';
import columns116Parser from './parsers/columns116.js';
import columns102Parser from './parsers/columns102.js';
import cards93Parser from './parsers/cards93.js';
import cards115Parser from './parsers/cards115.js';
import cards105Parser from './parsers/cards105.js';
import cards120Parser from './parsers/cards120.js';
import columns119Parser from './parsers/columns119.js';
import columns121Parser from './parsers/columns121.js';
import cards122Parser from './parsers/cards122.js';
import cards118Parser from './parsers/cards118.js';
import cards123Parser from './parsers/cards123.js';
import columns125Parser from './parsers/columns125.js';
import columns114Parser from './parsers/columns114.js';
import columns117Parser from './parsers/columns117.js';
import columns126Parser from './parsers/columns126.js';
import accordion130Parser from './parsers/accordion130.js';
import columns128Parser from './parsers/columns128.js';
import cards131Parser from './parsers/cards131.js';
import columns113Parser from './parsers/columns113.js';
import columns134Parser from './parsers/columns134.js';
import columns135Parser from './parsers/columns135.js';
import columns71Parser from './parsers/columns71.js';
import columns124Parser from './parsers/columns124.js';
import embedVideo132Parser from './parsers/embedVideo132.js';
import cards136Parser from './parsers/cards136.js';
import columns83Parser from './parsers/columns83.js';
import cards139Parser from './parsers/cards139.js';
import columns141Parser from './parsers/columns141.js';
import columns127Parser from './parsers/columns127.js';
import cards144Parser from './parsers/cards144.js';
import columns143Parser from './parsers/columns143.js';
import cards146Parser from './parsers/cards146.js';
import accordion138Parser from './parsers/accordion138.js';
import cards148Parser from './parsers/cards148.js';
import accordion147Parser from './parsers/accordion147.js';
import cards149Parser from './parsers/cards149.js';
import columns142Parser from './parsers/columns142.js';
import carousel150Parser from './parsers/carousel150.js';
import accordion151Parser from './parsers/accordion151.js';
import cards152Parser from './parsers/cards152.js';
import accordion154Parser from './parsers/accordion154.js';
import accordion155Parser from './parsers/accordion155.js';
import accordion156Parser from './parsers/accordion156.js';
import columns145Parser from './parsers/columns145.js';
import columns157Parser from './parsers/columns157.js';
import columns137Parser from './parsers/columns137.js';
import columns129Parser from './parsers/columns129.js';
import cards160Parser from './parsers/cards160.js';
import accordion162Parser from './parsers/accordion162.js';
import hero165Parser from './parsers/hero165.js';
import columns164Parser from './parsers/columns164.js';
import cards167Parser from './parsers/cards167.js';
import columns166Parser from './parsers/columns166.js';
import columns159Parser from './parsers/columns159.js';
import columns168Parser from './parsers/columns168.js';
import columns163Parser from './parsers/columns163.js';
import columns171Parser from './parsers/columns171.js';
import columns133Parser from './parsers/columns133.js';
import columns172Parser from './parsers/columns172.js';
import columns175Parser from './parsers/columns175.js';
import cards177Parser from './parsers/cards177.js';
import hero170Parser from './parsers/hero170.js';
import columns179Parser from './parsers/columns179.js';
import accordion158Parser from './parsers/accordion158.js';
import embedVideo140Parser from './parsers/embedVideo140.js';
import columns180Parser from './parsers/columns180.js';
import cards169Parser from './parsers/cards169.js';
import cards182Parser from './parsers/cards182.js';
import cards183Parser from './parsers/cards183.js';
import cards185Parser from './parsers/cards185.js';
import columns187Parser from './parsers/columns187.js';
import cards189Parser from './parsers/cards189.js';
import columns178Parser from './parsers/columns178.js';
import columns176Parser from './parsers/columns176.js';
import columns190Parser from './parsers/columns190.js';
import cards184Parser from './parsers/cards184.js';
import columns192Parser from './parsers/columns192.js';
import columns193Parser from './parsers/columns193.js';
import table191Parser from './parsers/table191.js';
import accordion61Parser from './parsers/accordion61.js';
import columns181Parser from './parsers/columns181.js';
import columns195Parser from './parsers/columns195.js';
import columns196Parser from './parsers/columns196.js';
import cards198Parser from './parsers/cards198.js';
import hero194Parser from './parsers/hero194.js';
import columns200Parser from './parsers/columns200.js';
import columns197Parser from './parsers/columns197.js';
import columns203Parser from './parsers/columns203.js';
import cards204Parser from './parsers/cards204.js';
import hero202Parser from './parsers/hero202.js';
import columns206Parser from './parsers/columns206.js';
import cards186Parser from './parsers/cards186.js';
import columns199Parser from './parsers/columns199.js';
import hero205Parser from './parsers/hero205.js';
import cards209Parser from './parsers/cards209.js';
import cardsNoImages188Parser from './parsers/cardsNoImages188.js';
import cards215Parser from './parsers/cards215.js';
import cards212Parser from './parsers/cards212.js';
import cards201Parser from './parsers/cards201.js';
import accordion153Parser from './parsers/accordion153.js';
import hero216Parser from './parsers/hero216.js';
import cards208Parser from './parsers/cards208.js';
import columns218Parser from './parsers/columns218.js';
import columns217Parser from './parsers/columns217.js';
import columns221Parser from './parsers/columns221.js';
import cards223Parser from './parsers/cards223.js';
import cards211Parser from './parsers/cards211.js';
import columns222Parser from './parsers/columns222.js';
import hero229Parser from './parsers/hero229.js';
import accordion224Parser from './parsers/accordion224.js';
import cards228Parser from './parsers/cards228.js';
import cards213Parser from './parsers/cards213.js';
import cards232Parser from './parsers/cards232.js';
import embedVideo226Parser from './parsers/embedVideo226.js';
import cards230Parser from './parsers/cards230.js';
import cardsNoImages233Parser from './parsers/cardsNoImages233.js';
import columns220Parser from './parsers/columns220.js';
import cardsNoImages236Parser from './parsers/cardsNoImages236.js';
import columns238Parser from './parsers/columns238.js';
import columns225Parser from './parsers/columns225.js';
import cards239Parser from './parsers/cards239.js';
import columns235Parser from './parsers/columns235.js';
import cardsNoImages241Parser from './parsers/cardsNoImages241.js';
import columns242Parser from './parsers/columns242.js';
import cards245Parser from './parsers/cards245.js';
import columns243Parser from './parsers/columns243.js';
import columns246Parser from './parsers/columns246.js';
import cards247Parser from './parsers/cards247.js';
import columns248Parser from './parsers/columns248.js';
import columns249Parser from './parsers/columns249.js';
import hero251Parser from './parsers/hero251.js';
import carousel250Parser from './parsers/carousel250.js';
import cardsNoImages210Parser from './parsers/cardsNoImages210.js';
import columns252Parser from './parsers/columns252.js';
import cards254Parser from './parsers/cards254.js';
import cards244Parser from './parsers/cards244.js';
import video237Parser from './parsers/video237.js';
import accordion234Parser from './parsers/accordion234.js';
import cards260Parser from './parsers/cards260.js';
import columns253Parser from './parsers/columns253.js';
import video258Parser from './parsers/video258.js';
import hero263Parser from './parsers/hero263.js';
import columns261Parser from './parsers/columns261.js';
import embedSocial259Parser from './parsers/embedSocial259.js';
import hero265Parser from './parsers/hero265.js';
import cards266Parser from './parsers/cards266.js';
import hero268Parser from './parsers/hero268.js';
import columns262Parser from './parsers/columns262.js';
import columns255Parser from './parsers/columns255.js';
import columns161Parser from './parsers/columns161.js';
import cards256Parser from './parsers/cards256.js';
import embedVideo264Parser from './parsers/embedVideo264.js';
import accordion274Parser from './parsers/accordion274.js';
import columns271Parser from './parsers/columns271.js';
import hero270Parser from './parsers/hero270.js';
import columns267Parser from './parsers/columns267.js';
import cardsNoImages279Parser from './parsers/cardsNoImages279.js';
import cardsNoImages280Parser from './parsers/cardsNoImages280.js';
import columns277Parser from './parsers/columns277.js';
import cards281Parser from './parsers/cards281.js';
import accordion273Parser from './parsers/accordion273.js';
import embedVideo272Parser from './parsers/embedVideo272.js';
import cards282Parser from './parsers/cards282.js';
import columns231Parser from './parsers/columns231.js';
import cards285Parser from './parsers/cards285.js';
import columns275Parser from './parsers/columns275.js';
import columns287Parser from './parsers/columns287.js';
import cards278Parser from './parsers/cards278.js';
import video286Parser from './parsers/video286.js';
import hero276Parser from './parsers/hero276.js';
import cards291Parser from './parsers/cards291.js';
import columns290Parser from './parsers/columns290.js';
import columns283Parser from './parsers/columns283.js';
import columns293Parser from './parsers/columns293.js';
import columns297Parser from './parsers/columns297.js';
import cards299Parser from './parsers/cards299.js';
import columns294Parser from './parsers/columns294.js';
import columns289Parser from './parsers/columns289.js';
import columns298Parser from './parsers/columns298.js';
import cardsNoImages302Parser from './parsers/cardsNoImages302.js';
import columns301Parser from './parsers/columns301.js';
import columns295Parser from './parsers/columns295.js';
import cards284Parser from './parsers/cards284.js';
import hero300Parser from './parsers/hero300.js';
import hero296Parser from './parsers/hero296.js';
import columns288Parser from './parsers/columns288.js';
import columns269Parser from './parsers/columns269.js';
import columns227Parser from './parsers/columns227.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  hero4: hero4Parser,
  cards3: cards3Parser,
  accordion10: accordion10Parser,
  columns7: columns7Parser,
  cardsNoImages15: cardsNoImages15Parser,
  columns13: columns13Parser,
  accordion16: accordion16Parser,
  tabs20: tabs20Parser,
  cards9: cards9Parser,
  columns8: columns8Parser,
  cardsNoImages21: cardsNoImages21Parser,
  tableBordered23: tableBordered23Parser,
  columns6: columns6Parser,
  carousel5: carousel5Parser,
  columns17: columns17Parser,
  cards25: cards25Parser,
  accordion11: accordion11Parser,
  columns27: columns27Parser,
  hero26: hero26Parser,
  hero32: hero32Parser,
  accordion30: accordion30Parser,
  cards22: cards22Parser,
  columns28: columns28Parser,
  cards36: cards36Parser,
  columns1: columns1Parser,
  hero41: hero41Parser,
  video34: video34Parser,
  tableNoHeader42: tableNoHeader42Parser,
  columns43: columns43Parser,
  columns44: columns44Parser,
  accordion40: accordion40Parser,
  cards31: cards31Parser,
  columns48: columns48Parser,
  tabs35: tabs35Parser,
  hero53: hero53Parser,
  columns19: columns19Parser,
  accordion45: accordion45Parser,
  columns46: columns46Parser,
  embedSocial47: embedSocial47Parser,
  tableStripedBordered57: tableStripedBordered57Parser,
  hero59: hero59Parser,
  carousel51: carousel51Parser,
  columns39: columns39Parser,
  hero60: hero60Parser,
  hero55: hero55Parser,
  columns58: columns58Parser,
  cardsNoImages29: cardsNoImages29Parser,
  tabs18: tabs18Parser,
  columns66: columns66Parser,
  columns64: columns64Parser,
  hero63: hero63Parser,
  cards69: cards69Parser,
  columns56: columns56Parser,
  cardsNoImages65: cardsNoImages65Parser,
  accordion72: accordion72Parser,
  accordion67: accordion67Parser,
  columns62: columns62Parser,
  columns74: columns74Parser,
  columns77: columns77Parser,
  hero75: hero75Parser,
  columns70: columns70Parser,
  columns78: columns78Parser,
  tabs73: tabs73Parser,
  cards38: cards38Parser,
  columns82: columns82Parser,
  cards84: cards84Parser,
  cardsNoImages86: cardsNoImages86Parser,
  columns87: columns87Parser,
  columns85: columns85Parser,
  columns54: columns54Parser,
  accordion88: accordion88Parser,
  columns81: columns81Parser,
  columns89: columns89Parser,
  cards94: cards94Parser,
  columns91: columns91Parser,
  cards96: cards96Parser,
  cardsNoImages76: cardsNoImages76Parser,
  cards97: cards97Parser,
  accordion80: accordion80Parser,
  cards99: cards99Parser,
  hero100: hero100Parser,
  cards101: cards101Parser,
  cards103: cards103Parser,
  cards95: cards95Parser,
  columns92: columns92Parser,
  cards104: cards104Parser,
  cards106: cards106Parser,
  columns107: columns107Parser,
  cards109: cards109Parser,
  columns108: columns108Parser,
  columns98: columns98Parser,
  columns110: columns110Parser,
  columns111: columns111Parser,
  cards112: cards112Parser,
  columns116: columns116Parser,
  columns102: columns102Parser,
  cards93: cards93Parser,
  cards115: cards115Parser,
  cards105: cards105Parser,
  cards120: cards120Parser,
  columns119: columns119Parser,
  columns121: columns121Parser,
  cards122: cards122Parser,
  cards118: cards118Parser,
  cards123: cards123Parser,
  columns125: columns125Parser,
  columns114: columns114Parser,
  columns117: columns117Parser,
  columns126: columns126Parser,
  accordion130: accordion130Parser,
  columns128: columns128Parser,
  cards131: cards131Parser,
  columns113: columns113Parser,
  columns134: columns134Parser,
  columns135: columns135Parser,
  columns71: columns71Parser,
  columns124: columns124Parser,
  embedVideo132: embedVideo132Parser,
  cards136: cards136Parser,
  columns83: columns83Parser,
  cards139: cards139Parser,
  columns141: columns141Parser,
  columns127: columns127Parser,
  cards144: cards144Parser,
  columns143: columns143Parser,
  cards146: cards146Parser,
  accordion138: accordion138Parser,
  cards148: cards148Parser,
  accordion147: accordion147Parser,
  cards149: cards149Parser,
  columns142: columns142Parser,
  carousel150: carousel150Parser,
  accordion151: accordion151Parser,
  cards152: cards152Parser,
  accordion154: accordion154Parser,
  accordion155: accordion155Parser,
  accordion156: accordion156Parser,
  columns145: columns145Parser,
  columns157: columns157Parser,
  columns137: columns137Parser,
  columns129: columns129Parser,
  cards160: cards160Parser,
  accordion162: accordion162Parser,
  hero165: hero165Parser,
  columns164: columns164Parser,
  cards167: cards167Parser,
  columns166: columns166Parser,
  columns159: columns159Parser,
  columns168: columns168Parser,
  columns163: columns163Parser,
  columns171: columns171Parser,
  columns133: columns133Parser,
  columns172: columns172Parser,
  columns175: columns175Parser,
  cards177: cards177Parser,
  hero170: hero170Parser,
  columns179: columns179Parser,
  accordion158: accordion158Parser,
  embedVideo140: embedVideo140Parser,
  columns180: columns180Parser,
  cards169: cards169Parser,
  cards182: cards182Parser,
  cards183: cards183Parser,
  cards185: cards185Parser,
  columns187: columns187Parser,
  cards189: cards189Parser,
  columns178: columns178Parser,
  columns176: columns176Parser,
  columns190: columns190Parser,
  cards184: cards184Parser,
  columns192: columns192Parser,
  columns193: columns193Parser,
  table191: table191Parser,
  accordion61: accordion61Parser,
  columns181: columns181Parser,
  columns195: columns195Parser,
  columns196: columns196Parser,
  cards198: cards198Parser,
  hero194: hero194Parser,
  columns200: columns200Parser,
  columns197: columns197Parser,
  columns203: columns203Parser,
  cards204: cards204Parser,
  hero202: hero202Parser,
  columns206: columns206Parser,
  cards186: cards186Parser,
  columns199: columns199Parser,
  hero205: hero205Parser,
  cards209: cards209Parser,
  cardsNoImages188: cardsNoImages188Parser,
  cards215: cards215Parser,
  cards212: cards212Parser,
  cards201: cards201Parser,
  accordion153: accordion153Parser,
  hero216: hero216Parser,
  cards208: cards208Parser,
  columns218: columns218Parser,
  columns217: columns217Parser,
  columns221: columns221Parser,
  cards223: cards223Parser,
  cards211: cards211Parser,
  columns222: columns222Parser,
  hero229: hero229Parser,
  accordion224: accordion224Parser,
  cards228: cards228Parser,
  cards213: cards213Parser,
  cards232: cards232Parser,
  embedVideo226: embedVideo226Parser,
  cards230: cards230Parser,
  cardsNoImages233: cardsNoImages233Parser,
  columns220: columns220Parser,
  cardsNoImages236: cardsNoImages236Parser,
  columns238: columns238Parser,
  columns225: columns225Parser,
  cards239: cards239Parser,
  columns235: columns235Parser,
  cardsNoImages241: cardsNoImages241Parser,
  columns242: columns242Parser,
  cards245: cards245Parser,
  columns243: columns243Parser,
  columns246: columns246Parser,
  cards247: cards247Parser,
  columns248: columns248Parser,
  columns249: columns249Parser,
  hero251: hero251Parser,
  carousel250: carousel250Parser,
  cardsNoImages210: cardsNoImages210Parser,
  columns252: columns252Parser,
  cards254: cards254Parser,
  cards244: cards244Parser,
  video237: video237Parser,
  accordion234: accordion234Parser,
  cards260: cards260Parser,
  columns253: columns253Parser,
  video258: video258Parser,
  hero263: hero263Parser,
  columns261: columns261Parser,
  embedSocial259: embedSocial259Parser,
  hero265: hero265Parser,
  cards266: cards266Parser,
  hero268: hero268Parser,
  columns262: columns262Parser,
  columns255: columns255Parser,
  columns161: columns161Parser,
  cards256: cards256Parser,
  embedVideo264: embedVideo264Parser,
  accordion274: accordion274Parser,
  columns271: columns271Parser,
  hero270: hero270Parser,
  columns267: columns267Parser,
  cardsNoImages279: cardsNoImages279Parser,
  cardsNoImages280: cardsNoImages280Parser,
  columns277: columns277Parser,
  cards281: cards281Parser,
  accordion273: accordion273Parser,
  embedVideo272: embedVideo272Parser,
  cards282: cards282Parser,
  columns231: columns231Parser,
  cards285: cards285Parser,
  columns275: columns275Parser,
  columns287: columns287Parser,
  cards278: cards278Parser,
  video286: video286Parser,
  hero276: hero276Parser,
  cards291: cards291Parser,
  columns290: columns290Parser,
  columns283: columns283Parser,
  columns293: columns293Parser,
  columns297: columns297Parser,
  cards299: cards299Parser,
  columns294: columns294Parser,
  columns289: columns289Parser,
  columns298: columns298Parser,
  cardsNoImages302: cardsNoImages302Parser,
  columns301: columns301Parser,
  columns295: columns295Parser,
  cards284: cards284Parser,
  hero300: hero300Parser,
  hero296: hero296Parser,
  columns288: columns288Parser,
  columns269: columns269Parser,
  columns227: columns227Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const pageElements = [{ name: 'metadata' }];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ element = main, ...pageBlock }) => {
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${pageBlock.key}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
