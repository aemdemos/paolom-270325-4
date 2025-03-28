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
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import hero1Parser from './parsers/hero1.js';
import columns3Parser from './parsers/columns3.js';
import cards__no_images_4Parser from './parsers/cards__no_images_4.js';
import table__no_header_6Parser from './parsers/table__no_header_6.js';
import hero7Parser from './parsers/hero7.js';
import cards8Parser from './parsers/cards8.js';
import columns9Parser from './parsers/columns9.js';
import embed__social_10Parser from './parsers/embed__social_10.js';
import embed__social_11Parser from './parsers/embed__social_11.js';
import cards__no_images_12Parser from './parsers/cards__no_images_12.js';
import search13Parser from './parsers/search13.js';
import columns14Parser from './parsers/columns14.js';
import accordion15Parser from './parsers/accordion15.js';
import columns__three_columns_16Parser from './parsers/columns__three_columns_16.js';
import embed__video_17Parser from './parsers/embed__video_17.js';
import table__striped___bordered_18Parser from './parsers/table__striped___bordered_18.js';
import columns19Parser from './parsers/columns19.js';
import cards20Parser from './parsers/cards20.js';
import table21Parser from './parsers/table21.js';
import cards22Parser from './parsers/cards22.js';
import cards23Parser from './parsers/cards23.js';
import hero24Parser from './parsers/hero24.js';
import table__striped___bordered_25Parser from './parsers/table__striped___bordered_25.js';
import hero27Parser from './parsers/hero27.js';
import search28Parser from './parsers/search28.js';
import accordion29Parser from './parsers/accordion29.js';
import cards__no_images_30Parser from './parsers/cards__no_images_30.js';
import cards31Parser from './parsers/cards31.js';
import accordion32Parser from './parsers/accordion32.js';
import cards__no_images_33Parser from './parsers/cards__no_images_33.js';
import cards34Parser from './parsers/cards34.js';
import accordion35Parser from './parsers/accordion35.js';
import hero37Parser from './parsers/hero37.js';
import columns38Parser from './parsers/columns38.js';
import accordion39Parser from './parsers/accordion39.js';
import cards__no_images_41Parser from './parsers/cards__no_images_41.js';
import cards42Parser from './parsers/cards42.js';

import headerParser from './parsers/header.js';

import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
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
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
      'Hero 1': hero1Parser,
    'Columns 3': columns3Parser,
    'Cards (no images) 4': cards__no_images_4Parser,
    'Table (no header) 6': table__no_header_6Parser,
    'Hero 7': hero7Parser,
    'Cards 8': cards8Parser,
    'Columns 9': columns9Parser,
    'Embed (social) 10': embed__social_10Parser,
    'Embed (social) 11': embed__social_11Parser,
    'Cards (no images) 12': cards__no_images_12Parser,
    'Search 13': search13Parser,
    'Columns 14': columns14Parser,
    'Accordion 15': accordion15Parser,
    'Columns (three columns) 16': columns__three_columns_16Parser,
    'Embed (video) 17': embed__video_17Parser,
    'Table (striped & bordered) 18': table__striped___bordered_18Parser,
    'Columns 19': columns19Parser,
    'Cards 20': cards20Parser,
    'Table 21': table21Parser,
    'Cards 22': cards22Parser,
    'Cards 23': cards23Parser,
    'Hero 24': hero24Parser,
    'Table (striped & bordered) 25': table__striped___bordered_25Parser,
    'Hero 27': hero27Parser,
    'Search 28': search28Parser,
    'Accordion 29': accordion29Parser,
    'Cards (no images) 30': cards__no_images_30Parser,
    'Cards 31': cards31Parser,
    'Accordion 32': accordion32Parser,
    'Cards (no images) 33': cards__no_images_33Parser,
    'Cards 34': cards34Parser,
    'Accordion 35': accordion35Parser,
    'Hero 37': hero37Parser,
    'Columns 38': columns38Parser,
    'Accordion 39': accordion39Parser,
    'Cards (no images) 41': cards__no_images_41Parser,
    'Cards 42': cards42Parser,
};

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // first, get dom elements for each block for the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });
  // also get all fragment elements for the current page
  const fragmentElements = fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath));

  // remove fragment elements
  fragmentElements.forEach((element) => {
    element.remove();
  });

  // transform all blocks using parsers
  blockElements.forEach(({ name, cluster, element }) => {
    const parserFn = parsers[`${name} ${cluster}`];

    if (!parserFn) return;

    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
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
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
