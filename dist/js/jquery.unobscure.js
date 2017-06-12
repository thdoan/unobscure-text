/*!
 * Unobscure Text v1.0.0 by T. H. Doan (https://thdoan.github.io/unobscure-text/)
 *
 * Released under the MIT License. Read a copy of the license in the LICENSE file or at
 * https://choosealicense.com/licenses/mit/
 */
(function($) {
  'use strict';
  // PLUGIN DEFINITION
  $.fn.unobscure = function(oOptions) {
    // Quit if SVG not supported
    if (typeof SVGRect==='undefined' || !document.createElementNS) {
      console.warn('[Unobscure Text] This browser does not appear to support SVG.');
      return;
    }
    // Merge default and user-specified options
    oOptions = $.extend($.fn.unobscure.defaults, oOptions);
    // PRIVATE GLOBAL VARIABLES
    var $target = $(oOptions['target']),
      $text = this, // Preserve scope
      nTextHeight = $text.height(),
      init = function($el) {
        $el.css('position', 'relative').attr('data-text', $el.text().trim());
      },
      svg = function(sTag) {
        return document.createElementNS('http://www.w3.org/2000/svg', sTag);
      };
    // Quit if no obstruction target provided
    if (!$target.length) {
      console.warn('[Unobscure Text] Invalid obstruction target provided (\'target\' option).');
      return;
    }
    // Create SVG clip mask
    $('body').append(
      $(svg('svg')).attr({
        'width': 0,
        'height': 0
      }).css({
        'position': 'absolute',
        'left': '-100%'
      }).append(
        $(svg('defs')).append(
          $(svg('clipPath')).attr('id', 'unobscure-mask').append(
            $(svg('rect')).attr({
              'x': 0,
              'y': nTextHeight,
              'width': screen.width,
              'height': nTextHeight
            })
          )
        )
      )
    );
    var $rect = $('#unobscure-mask>rect');
    // Add custom stylesheet
    document.styleSheets[0].addRule($text.selector + ':after',
      'position:absolute;' +
      'top:0;' +
      'left:0;' +
      'clip-path:url(#unobscure-mask);' +
      'content:attr(data-text);' +
      oOptions['textCss']
    );
    // Update clip dimenions on scroll
    $(window).scroll(function() {
      var nPos = $target.offset().top-document.body.scrollTop,
        nStart = $text[0].getBoundingClientRect().bottom;
      $rect.attr('y', (nPos<nStart) ? Math.max(nTextHeight-(nStart-nPos), 0) : nTextHeight);
    });
    return $text.each(function() {
      // Initialize the element
      init($(this));
    });
  };
  // DEFAULT OPTIONS
  $.fn.unobscure.defaults = {
    'target': '',
    'textCss': ''
  };
}(jQuery));
