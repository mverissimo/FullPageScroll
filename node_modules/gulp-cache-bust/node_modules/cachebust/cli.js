#! /usr/bin/env node

'use strict';

var cachebust = require('./lib/cachebust'),
fs = require('fs');

var userArgs = process.argv,
filePath = userArgs[2];

if (filePath.indexOf('.html') > -1) {
  var options = {
    type: (userArgs[3]) ? userArgs[3] : 'MD5'
  };

  fs.readFile(filePath, 'utf8', function (err, html) {
    if (err) {
      throw err;
    }
    cachebust.busted(html, options);
  });
}

if (userArgs.indexOf('-v') !== -1 || userArgs.indexOf('--version') !== -1) {
  return console.log(require('./package').version);
}
