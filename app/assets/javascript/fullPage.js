/* ===========================================================
 * Simple Full Page Scroll beta
 * ===========================================================
 * Copyright 2015 Matheus Verissimo.
 * ma.theus_verissimo@hotmail.com
 *
 * Create awesome pages full scroll
 *
 * ========================================================== */

/**
 *  SimpleFs() returns a new element
 *
 *  @para {HTMLElement} element
 *  @param {object} options
 *  @type {object} SimpleFs
 */

var SimpleFs = function(element, options) {
  'use strict';

  // TODO: Defaults can be configurable by an options param
  var defaults = {
    section: '.section',

    animationDuration: 700,
    animationTiming: 'ease',
    animationTranform: 'transform',

    pagination: true,
    keyboard: true,

    // Infinite
    // If section === last, move to first
    infinite: false,

    onLeave: null,
    afterMove: null,

  };

  var settings = Object.extend({}, defaults, options);
  var el = document.querySelector(element);
  var sections = el.querySelectorAll(settings.section);
  var total = sections.length;
  var body = document.querySelector('body');

  var current = 0;

  var lastAnimation = 0;
  var lastPress = 0;

  var paginationList = '';

  /**
   * setActive
   *
   * @description
   */
  var setActive = function(index) {
    var paginationLinks = document.querySelectorAll('.slide-navigation li a');

    for (var i = 0; i < total; i++) {
      sections[i].classList.remove('is-active');
      paginationLinks[i].classList.remove('is-active');

    }

    sections[current].classList.add('is-active');
    paginationLinks[current].classList.add('is-active');

  };

  /**
   * section
   *
   * @description using css transform to move section
   * @param {{Number}} index move to section
   */
  var move = function(index) {

    if (typeof settings.onLeave === 'function') {
      settings.onLeave(current);

    }

    var webkit = '-webkit-transform: translate3d(0, ' + index * -100 + '%, 0); -webkit-transition: -webkit-transform ' + settings.animationDuration + 'ms ' + settings.animationTiming + ';';
    var ms = ' -ms-transform: translate3d(0, ' + index * -100 + '%, 0); -ms-transition: -ms-transform ' + settings.animationDuration + 'ms ' + settings.animationTiming + ';';
    var moz = '-moz-transform: translate3d(0, ' + index * -100 + '%, 0); -moz-transition: -moz-transform ' + settings.animationDuration + 'ms ' + settings.animationTiming + ';';
    var normal = 'transform: translate3d(0, ' + index * -100 + '%, 0); transition: transform ' + settings.animationTime + 'ms ' + settings.easing + ';';

    el.style.cssText = normal + webkit + ms + moz;

    el.addEventListener('transitionend', function() {

      if (typeof settings.afterMove === 'function') {
        settings.afterMove(current);

      }
      
    });

    current = index;

    // addClass active
    setActive(index);

  };

  var transitionEnd = function() {

  };

  /**
   * scrollUp
   *
   * @description move section to up
   */
  var scrollUp = function() {
    if (current > 0) {
      move(current - 1);

    }

  };

  /**
   * scrollDown
   *
   * @description move section to down
   */
  var scrollDown = function() {
    if (current < total - 1) {
      move(current + 1);

    } else if (settings.infinite === true) { //move to first section
      if (current < total) {
        move(0);

      }

    }

  };

  /**
   * scrollDelta
   *
   * @description get Delta position and move Up and Down based on scroll
   * @param {DOMEvent} event
   */
  var scrollDelta = function(event) {

    var delta = event.wheelDelta || -event.detail;
    // http://stackoverflow.com/a/17514856
    var time = new Date().getTime();

    if (time - lastAnimation < settings.animationDuration) {
      return;

    }

    if (delta > 0) {
      scrollUp();

    } else {
      scrollDown();

    }

    lastAnimation = time;

  };

  /**
   * keyboard
   *
   * @description move section on press keys(down, up)
   * @param {{DOMEvent}} e
   */
  var keyboard = function(e) {
    var keyCode = e.keyCode;

    // http://stackoverflow.com/a/17514856
    var time = new Date().getTime();
    if (time - lastPress < settings.animationDuration) {
      return;
    }

    switch (keyCode) {
      case 38:
        scrollUp();
        break;

      case 40:
        scrollDown();
        break;

    }

    lastPress = time;

  };

  /**
   * pagination
   *
   * @description build pagination dots
   */
  var pagination = function() {
    for (var i = 0; i < total; i++) {
      paginationList += '<li><a data-index=\"' + i + '\" href=\"#' + i + '"\></a></li>';

    }

    var pagination = document.createElement('ul');
    pagination.setAttribute('class', 'slide-navigation');
    pagination.innerHTML = paginationList;

    body.appendChild(pagination);

  };

  /**
   * paginationBind
   *
   * @description Move slide when clicked in dot
   * @param {{DOMEvent}} e
   */
  var paginationBind = function(e) {
    e.preventDefault();

    var index = this.dataset.index;
    move(parseInt(index));

  };
  /**
   * moveTo
   *
   * @description move slide to index pass on param in function
   * @param  {{Number}} index slide index
   */
  SimpleFs.prototype.moveTo = function(index) {
    move(index);

  };

  /**
   * bindEvents
   *
   * @description initialize events
   */
  var bindEvents = function() {
    if (settings.keyboard === true) {
      document.addEventListener('keydown', keyboard);
      document.addEventListener('keyup', keyboard);

    }

    // Reference line: 50
    // add and remove class 'is-active'
    if (settings.pagination === true) {
      var paginationLinks = document.querySelectorAll('.slide-navigation li a');

      for (var i = 0; i < paginationLinks.length; i++) {
        paginationLinks[i].addEventListener('click', paginationBind);

      }

    }

    if (typeof settings.afterMove === 'function') {

    }

    document.addEventListener('mousewheel', scrollDelta);
    document.addEventListener('DOMMouseScroll', scrollDelta);

  };

  /**
   * init
   *
   * @description init plugin
   */
  var init = function() {
    if (settings.pagination === true) {
      pagination();

    }

    bindEvents();
    setActive();

  };

  init();

};

/**
 * @author John Resig to replicate extend functionality
 */
Object.extend = function(orig) {
  'use strict';
  if (orig === null) {
    return orig;

  }

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];
    if (obj !== null) {
      for (var prop in obj) {
        var getter = obj.__lookupGetter__(prop),
          setter = obj.__lookupSetter__(prop);

        if (getter || setter) {
          if (getter)
            orig.__defineGetter__(prop, getter);

          if (setter)
            orig.__defineSetter__(prop, setter);

        } else {
          orig[prop] = obj[prop];

        }

      }

    }

  }

  return orig;

};