/*
 *  Project: Infinitus Scroll
 *  Description: A super tiny jQuery plugin to implement infinite scrolling.
 *  Author: Rick Pastoor (rick@wrep.nl)
 *  License: MIT
 */

;(function ($, window, document, undefined) {
	"use strict";

    // Set up defaults
    var pluginName = "infinitus";
    var defaults = {
        trigger: $.noop,
        onStart: $.noop,
        onEnd: $.noop
    };

    /**
     * Construct Infinitus
     */
    function Infinitus(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.window = $(window);
        this.working = false;
        this.init();
    }

    Infinitus.prototype = {
        init: function() {
            var self = this;
            self.window.on('scroll', function() {
                if (!self.working && self.isAtBottom()) {
                    // Start working
                    self.working = true;

                    // Call onStart
                    $.proxy(self.options.onStart, self.element)();

                    $.proxy(self.options.trigger, self.element, function() {
                        // End working
                        self.working = false;

                        // Call onEnd
                        $.proxy(self.options.onEnd, self.element)();
                    })();
                }
            });
        },

        isAtBottom: function() {
            var contentOffset = this.element.offset(),
                elementBottom = this.element.height() + contentOffset.top,
                scrollBottom = this.window.scrollTop() + this.window.height();

            return scrollBottom >= elementBottom;
        }
    };

    $.fn[pluginName] = function(options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Infinitus(this, options));
            }
        });
    };

})(jQuery, window, document);