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
        onPause: $.noop,
        onResume: $.noop,
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
        this.paused = false;
        this.scrollHandler = $.noop;
        this.init();
    }

    Infinitus.prototype = {
        init: function() {
            var self = this;

            self.scrollHandler = function() {
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
            };
            self.window.on('scroll', self.scrollHandler);
        },

        pause: function() {
            var self = this;

            if (!self.paused) {
                // Pause
                self.paused = true;
                self.window.off('scroll', self.scrollHandler);

                // Call onPause
                $.proxy(self.options.onPause, self.element)();
            }
        },

        resume: function() {
            var self = this;

            if (self.paused) {
                // Call onResume
                $.proxy(self.options.onResume, self.element)();

                // Resume and immediately trigger if we're on the bottom
                self.paused = false;
                self.scrollHandler();
                self.window.on('scroll', self.scrollHandler);
            }
        },

        isAtBottom: function() {
            var contentOffset = this.element.offset(),
                elementBottom = this.element.height() + contentOffset.top,
                scrollBottom = this.window.scrollTop() + this.window.height();

            return scrollBottom >= elementBottom;
        }


    };

    $.fn[pluginName] = function(argument) {
        return this.each(function () {
            // Check if user want to call a method
            if (typeof argument === 'string') {
                var instance = $.data(this, "plugin_" + pluginName),
                    functionArgs = Array.prototype.slice.call(arguments, 1);
                if (instance && typeof instance[argument] === 'function') {
                    return instance[argument].apply(instance, functionArgs);
                } else {
                    return null;
                }
            }

            // Else instantiate infinitus
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Infinitus(this, argument));
            }
        });
    };

})(jQuery, window, document);