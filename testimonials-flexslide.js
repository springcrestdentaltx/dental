+function ($) {
    "use strict";

    var TestimonialsFlexSlide = function (element, options) {
        var self = this;
        self.$element = $(element);
        self.options = options;

        var lazyLoadImg = false;
        $('.lazyLoadImg').length ? lazyLoadImg = true : lazyLoadImg = false;

        if (self.options.animation === 'fade' && self.options.smoothHeight == 1) self.$element.css({ 'overflow': 'hidden' });

        if (self.options.randomOrder == 1) { self.options.randomize = true; }

        var callbacks = {
            start: function (slider) {
                if (lazyLoadImg) triggerScroll();
                if (self.options.direction === 'vertical') {
                    self.fixVerticalSlideHeight();
                    $(slider).resize();
                    self.fixVerticalSlideSmoothHeight(slider);
                }
            },
            before: function () {
                if (lazyLoadImg) triggerScroll();
            },
            after: function (slider) {
                self.fixVerticalSlideSmoothHeight(slider);
            }
        };

        $.extend(self.options, callbacks);

        self.initializeSlider();
        self.attachEvents();
        function triggerScroll() { setTimeout(function () { $(window).trigger("scroll"); }, 600); }

        return self;
    }

    TestimonialsFlexSlide.prototype.attachEvents = function () {
        var self = this, win = $(window), $el = self.$element;
        if (self.options.direction === 'vertical') win.resize(self.fixVerticalSlideHeight());

        $el.off('click').on('click', '.expand', function () {
            if (self.options.animation == 'slide') {
                if (self.options.direction === 'vertical') { self.fixSlideExpand($el); }
                $el.resize();
            } else {
                self.fixFadeExpand($el);
            }
        });
    }

    TestimonialsFlexSlide.prototype.initializeSlider = function () {
        var self = this;
        self.$bxSlider = self.$element.flexslider(self.options);
        if (self.options.direction === 'vertical') self.fixVerticalSlideHeight();
    }

    TestimonialsFlexSlide.prototype.fixVerticalSlideHeight = function () {
        var self = this,
            maxHeight = 0,
            slides = self.$element.find('.slides');

        slides.children().height('auto').each(function () {
            maxHeight = Math.max(maxHeight, $(this).outerHeight(true));
        }).height(maxHeight);

        slides.height(maxHeight);
    }

    TestimonialsFlexSlide.prototype.fixVerticalSlideSmoothHeight = function (slider) {
        var self = this;
        if (self.options.direction === 'vertical' && self.options.smoothHeight == 1) {
            var activeSlideHeight = $(slider).find('.flex-active-slide > div').outerHeight(true);
            $(slider).find('.flex-viewport').height(activeSlideHeight);
        }
    }

    TestimonialsFlexSlide.prototype.fixSlideExpand = function (el) {
        var self = this, $el = el;
        if (self.options.smoothHeight != 1) $el.find('.flex-viewport').css({ 'transition': 'none' });
        self.fixVerticalSlideHeight($el);
    }

    TestimonialsFlexSlide.prototype.fixFadeExpand = function (el) {
        var $el = el,
            $slides = $el.find('.slides'),
            elHeight = $el.height();

        $el.css({ 'transition': 'all 1s ease', 'max-height': elHeight });
        $el.resize();
        var slideHeight = $slides.height();
        $el.css({ 'max-height': slideHeight });
    }

    TestimonialsFlexSlide.DEFAULTS = {
        adaptiveHeight: true,
        easing: null,
        useCSS: false,
        randomize: false
    }

    var old = $.fn.TestimonialsFlexSlide;

    $.fn.TestimonialsFlexSlide = function (option) {
        var args = arguments, result, obj;

        var $this = $(this);
        var options = $.extend({}, TestimonialsFlexSlide.DEFAULTS, $this.data(), typeof option == 'object' && option);
        var data = '';

        return new TestimonialsFlexSlide(this, options);
    };

    $.fn.TestimonialsFlexSlide.Constructor = TestimonialsFlexSlide

    $.fn.TestimonialsFlexSlide.noConflict = function () {
        $.fn.TestimonialsFlexSlide = old
    }

    $(window).load(function () {
        var $testimonialSection = $('.flexslider-d');
        if ($testimonialSection.length) {
            $testimonialSection.each(function () {
                $(this).TestimonialsFlexSlide();
            });
        }
    });

}(window.jQuery);