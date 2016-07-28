/*global describe,it*/
'use strict';
var assert = require('assert'),
  cachebust = require('../lib/cachebust.js');

describe('cachebust node module.', function() {
  it('must be awesome', function() {
    assert( cachebust.awesome(), 'awesome');
  });
});
