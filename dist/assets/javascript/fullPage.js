/* ===========================================================
 * Simple Full Page Scroll beta
 * ===========================================================
 * Copyright 2015 Matheus Verissimo.
 * ma.theus_verissimo@hotmail.com
 *
 * Create awesome pages full scroll
 *
 * ========================================================== */

var defaults = {
  section: '.section',

  animationDuration: 700,
  animationTiming: 'ease',
  animationTranform: 'transform',

  pagination: true,
  keyboard: true,

  touch: true,
  touchLimit: 100,

  loop: false,

  onLeave: null,
  afterLoad: null,

};

var utils = {
  setVendor: function(el, property, value) {

    if (!el) {
      return;
    }

    el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
    el.style['webkit' + property] = value;
    el.style['moz' + property] = value;
    el.style['ms' + property] = value;
    el.style['o' + property] = value;

  },

};

var FullPage = function(element, options) {
  'use strict';

  // Element
  this.el = document.querySelector(element);

  // Settings
  this.settings = Object.assign({}, defaults, options);

  // Body
  this.body = document.querySelector('body');

  // Sections
  this.sections = this.el.querySelectorAll(this.settings.section);

  //init
  this.init();

  return this;

};

FullPage.prototype.init = function() {
  this.index = 0;
  this.lastAnimation = 0;

  this.build();
  this.bindEvents();
  this.makeActive(this.index);

};

FullPage.prototype.build = function() {
  if (this.settings.pagination) {
    this.paginationHTML();

  }

};

FullPage.prototype.bindEvents = function() {
  var self = this;

  if (this.settings.pagination) {
    var paginationLinks = document.querySelectorAll('.slide-navigation li a');

    for (var i = 0; i < paginationLinks.length; i++) {

      (function(index) {

        paginationLinks[i].addEventListener('click', function(event) {
          self.index = index;
          self.move(self.index);

          event.preventDefault();

        });

      })(i);

    }

  }

  if (this.settings.keyboard) {
    document.addEventListener('keydown', this.keyboard.bind(this));

  }

  if (this.settings.touch) {
    this.enableTouch(document);

  }

  document.addEventListener('mousewheel', this.mousewheel.bind(this));
  document.addEventListener('DOMMouseScroll', this.mousewheel.bind(this));

};

FullPage.prototype.makeActive = function(index) {
  var self = this;
  var paginationLinks = document.querySelectorAll('.slide-navigation li a');

  for (var i = 0; i < this.sections.length; i++) {
    this.sections[i].classList.remove('is-active');
    paginationLinks[i].classList.remove('is-active');

  }

  this.sections[index].classList.add('is-active');
  paginationLinks[index].classList.add('is-active');

};

FullPage.prototype.move = function(index) {

  var self = this;

  if (typeof self.settings.onLeave === 'function') {
    self.settings.onLeave(this.index);

  }

  utils.setVendor(this.el, 'Transform', 'translate3d(0, ' + index * -100 + '%, 0)');
  utils.setVendor(this.el, 'Transition', 'transform ' + this.settings.animationDuration + 'ms');

  var checkEnd = function() {
    if (typeof self.settings.afterLoad === 'function') {
      self.settings.afterLoad(self.index);

    }

  };

  this.el.addEventListener('transitionend', checkEnd);

  this.index = index;

  this.makeActive(index);

};

FullPage.prototype.moveUp = function() {
  if (this.index > 0) {
    this.move(this.index - 1);

  }

};

FullPage.prototype.moveDown = function() {
  if ((this.index + 1) < this.sections.length) {
    this.move(this.index + 1);

  }

};

FullPage.prototype.moveTo = function(index) {
  this.move(index);

};

FullPage.prototype.enableTouch = function(el) {
  var self = this;
  var startCoords = 0;
  var endCoords = 0;
  var distance = 0;

  el.addEventListener('touchstart', function(event) {
    startCoords = event.changedTouches[0].pageY;
    event.preventDefault();

  });

  el.addEventListener('touchmove', function(event) {
    event.preventDefault();

  });

  el.addEventListener('touchend', function(event) {
    var time = new Date().getTime();

    endCoords = event.changedTouches[0].pageY;
    distance = endCoords - startCoords;

    if (time - Math.abs(self.lastAnimation) < self.settings.animationDuration) {
      return;

    }

    if ((distance < 0) && (Math.abs(distance) > self.settings.touchLimit)) {
      self.moveDown();

    } else if ((distance > 0) && (Math.abs(distance) > self.settings.touchLimit)) {
      self.moveUp();

    }

    self.lastAnimation = time;

  });

};

FullPage.prototype.mousewheel = function(event) {
  var time = new Date().getTime();
  var delta = event.wheelDelta || -event.detail;

  if (time - Math.abs(this.lastAnimation) < this.settings.animationDuration) {
    return;

  }

  if (delta < 0) {
    this.moveDown();

  } else {
    this.moveUp();

  }

  this.lastAnimation = time;

};

FullPage.prototype.keyboard = function(event) {

  var time = new Date().getTime();

  if (time - Math.abs(this.lastAnimation) < this.settings.animationDuration) {
    return;

  }

  if (event.keyCode === 38) {
    this.moveUp();

  }

  if (event.keyCode === 40) {
    this.moveDown();

  }

  this.lastAnimation = time;

};

FullPage.prototype.paginationHTML = function() {
  var paginationList = '';

  for (var i = 0; i < this.sections.length; i++) {
    paginationList += '<li><a data-index=\"' + i + '\" href=\"#' + i + '"\></a></li>';

  }

  var pagination = document.createElement('ul');
  pagination.setAttribute('class', 'slide-navigation');
  pagination.innerHTML = paginationList;

  this.body.appendChild(pagination);

};
