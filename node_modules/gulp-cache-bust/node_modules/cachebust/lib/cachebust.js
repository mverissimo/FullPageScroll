/*
 *
 * https://github.com/furzeface/cachebust
 *
 * Copyright (c) 2014 Daniel Furze
 * Licensed under the MIT license.]
 *
 * @todo Detect if there's already a query string
 */

 'use strict';

 var $ = require('cheerio'),
 MD5 = require('MD5');

 exports.busted = function(fileContents, options) {

  if (options.type === 'timestamp') {
    var timestamp = new Date().getTime();
  }

  var protocolRegEx = /^http(s)?/,
  $scripts = $(fileContents).find('script'),
  $styles = $(fileContents).find('link[rel=stylesheet]');

  // Loop the stylesheet hrefs
  for (var i = 0; i < $styles.length; i++) {
    var styleHref = $styles[i].attribs.href;

      // Test for http(s) and don't cache bust if (assumed) served from CDN
      if (!protocolRegEx.test(styleHref)) {
        if (options.type === 'timestamp') {
          fileContents = fileContents.replace(styleHref, styleHref + '?t=' + timestamp);
        } else {
          fileContents = fileContents.replace(styleHref, styleHref + '?hash=' + MD5(fileContents));
        }
      }
    }

    // Loop the script srcs
    for (var i = 0; i < $scripts.length; i++) {
      var scriptSrc = $scripts[i].attribs.src;

      // Test for http(s) and don't cache bust if (assumed) served from CDN
      if (!protocolRegEx.test(scriptSrc)) {
        if (options.type === 'timestamp') {
          fileContents = fileContents.replace(scriptSrc, scriptSrc + '?t=' + timestamp);
        } else {
          fileContents = fileContents.replace(scriptSrc, scriptSrc + '?hash=' + MD5(fileContents));
        }
      }
    }

    return fileContents;
  };
