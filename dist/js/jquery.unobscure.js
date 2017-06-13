/*!
 * Unobscure Text v2.0.0 by T. H. Doan (https://thdoan.github.io/unobscure-text/)
 *
 * Released under the MIT License. Read a copy of the license in the LICENSE file or at
 * https://choosealicense.com/licenses/mit/
 */
(function($) {
  'use strict';
  // PLUGIN DEFINITION
  $.fn.unobscure = function(oOptions) {
    // Merge default and user-specified options
    oOptions = $.extend($.fn.unobscure.defaults, oOptions);
    // PRIVATE GLOBAL VARIABLES
    var $target = $(oOptions['target']),
      $text = this, // Preserve scope
      nTextWidth = Math.max.apply(null, $text.map(function(i, el) {
        // Get largest width
        return el.offsetWidth;
      }).get()),
      nTextHeight = $text.height(),
      sClass = $text.attr('class') || '',
      init = function($el) {
        $el.css('position', 'relative').attr('data-text', $el.text().trim());
      };
    // Quit if no obstruction target provided
    if (!$target.length) {
      console.warn('[Unobscure Text] Invalid obstruction target provided (\'target\' option).');
      return;
    }
    // Add custom styles
    document.styleSheets[0].addRule($text.selector + ':after',
      'position:absolute;' +
      'top:0;' +
      'left:0;' +
      'clip:rect(' + nTextHeight + 'px,' + nTextWidth + 'px,' + nTextHeight + 'px,0);' +
      'content:attr(data-text);' +
      oOptions['textCss']
    );
    for (var i=0; i<nTextHeight; ++i) {
      document.styleSheets[0].addRule($text.selector + '.unobscure-' + i + ':after',
        'clip:rect(' + i + 'px,' + nTextWidth + 'px,' + nTextHeight + 'px,0);'
      );
    }
    // Update clip dimenions on scroll
    $(window).scroll(function() {
      var nPos = $target.offset().top-(document.body.scrollTop||document.documentElement.scrollTop),
        nStart = $text[0].getBoundingClientRect().bottom;
      if (nPos<nStart) $text.attr('class', sClass + ' unobscure-' + Math.max(Math.round(nTextHeight-(nStart-nPos)), 0));
      else $text.attr('class', sClass);
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
