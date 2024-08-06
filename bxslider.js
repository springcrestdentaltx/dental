+function ($) { "use strict";

	var BXSlider = function(element, options) {
        var lazyLoadImg = false;
        $('.lazyLoadImg').length ? lazyLoadImg = true : lazyLoadImg = false;

        function triggerScroll() {
            setTimeout(function () { $(window).trigger("scroll"); }, 100);
        }

        this.$element = $(element);
        this.options = this.parseTrueFalseOptions(options);

        var self = this;
        self.options.autoplay = self.options.auto;
        self.options.auto = false;

        var callbacksJSON = {
            onSlideAfter: function() {
                if(self.options.auto){
                    self.$element.stopAuto();
                    self.$element.startAuto();
                }
                if (lazyLoadImg) triggerScroll();
            },
            onSliderLoad: function () {
                if(self.options.easing == '')
                    self.options.easing = null;

                if(self.options.controlsHover){
                    var $wrapper = self.$element.closest('.bx-wrapper');

                    $(".bx-controls-direction", $wrapper).hide();
                    $wrapper.hover(
                        function () { $(".bx-controls-direction", $(this)).fadeIn(300); },
                        function () { $(".bx-controls-direction", $(this)).fadeOut(300); }
                    );
                }

                if(self.options.autoHover){
                    var $wrapper = self.$element.closest('.bx-wrapper');

                    $wrapper.hover(
                        function () {
                            if(self.options.auto){
                                self.$element.stopAuto();
                            }
                        },
                        function () {
                            console.log(self.options.auto);
                            if(self.options.auto){
                                self.$element.startAuto();
                            }
                        }
                    );
                }

                if(self.options.easing != null){
                    self.options.useCSS = false;
                }

                if(self.options.autoplay){
                    self.makePauseSlideshowButton();
                    var wait = self.options.autoDelay;
                    setTimeout(function(){
                        self.$element.startAuto();
                        self.options.auto = true;
                    }, wait);
                }

                // wrap bx-slider buttons controls
                self.$element.closest('.bx-wrapper').find('.bx-controls').wrapAll("<div class='wrap__bx-controls' />");
                self.$element.closest('.bx-wrapper').find(".wrap_on-off, .wrap_pause-play, .bx-pager " ).wrapAll( "<div class='bx-controls-buttons' />");

                self.attachEvents();
            },
            onSlideNext: function() {
                if (lazyLoadImg) triggerScroll();
            },
            onSlidePrev: function() {
                if (lazyLoadImg) triggerScroll();
            }
        };

        $.extend(this.options, callbacksJSON);
        this.run();
    }

    BXSlider.prototype.attachEvents = function(){
        var self = this;

        var $viewport = self.$element.closest('.bx-wrapper').find('.bx-controls');

        $viewport.on('click', '.pause-slideshow', function(e, data){
            $(this).hide();
            self.$element.stopAuto();
            self.options.auto = false;
            $viewport.find('.play-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $viewport.on('click', '.play-slideshow', function(e, data){
            $(this).hide();
            self.$element.startAuto();
            self.options.auto = true;
            $viewport.find('.pause-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $('body').keypress(function(e){
            var key = e.which;
            if(key == 13){
                if($viewport.find('.play-slideshow').is(':focus')){
                    $viewport.find('.play-slideshow').trigger('click', { kb: true});
                }

                if($viewport.find('.pause-slideshow').is(':focus')){
                    $viewport.find('.pause-slideshow').trigger('click', { kb: true});
                }
            }
        });
    }

    BXSlider.prototype.makePauseSlideshowButton = function(){
        var self = this;

        var $htmlPauseSlideshow = [
            '<div class="wrap_pause-play">',
                '<div class="pause-slideshow" aria-label="icon pause" title="Pause slideshow" tabindex="0">',
                    '<span class="icon icon-pause"></span>',
                '</div>',
                '<div class="play-slideshow" aria-label="icon play" style="display: none" title="Play slideshow" tabindex="0">',
                    '<span class="icon icon-play"></span>',
                '</div>',
            '</div>'
        ];

        self.$element.closest('.bx-wrapper').find('.bx-controls').append($htmlPauseSlideshow.join(''));

    }

    BXSlider.prototype.parseTrueFalseOptions = function(options, skip){
        for (var key in options) {
          if (options.hasOwnProperty(key) && BXSlider.BOOLEANS.indexOf(key) != -1) {
            options[key] = !!options[key];
          }
        }

	  	return options;
    }

    BXSlider.prototype.run = function(){
        var self = this;

        $(window).load(function() {
            self.$bxSlider = self.$element.bxSlider(self.options);
            self.$bxSlider.redrawSlider();
        });
    }

    BXSlider.DEFAULTS = {
    	pager: true,
    	controls: true,
    	autoControls: false,
        auto: true,
        infiniteLoop: true,
        randomStart: false,
        controlsHover: false,
        responsive: false,
        mode: 'horizontal',
        speed: 500,
        pause: 4000,
        autoDelay: 0,
        easing: null,
        useCSS: false
    }

    BXSlider.BOOLEANS = [
        'pager',
        'controls',
        'autoControls',
        'auto',
        'infiniteLoop',
        'randomStart',
        'controlsHover',
        'responsive',
    ]

    var old = $.fn.BXSlider;

    $.fn.BXSlider = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this);

            var options = $.extend({}, BXSlider.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var data = '';

            $this.data('bxslider', (data = new BXSlider(this, options)));

            if (typeof result != 'undefined') return false;
        });

        return result ? result : this;
    };

    $.fn.BXSlider.Constructor = BXSlider

    $.fn.BXSlider.noConflict = function () {
        $.fn.BXSlider = old
        return this
    }

    $(function(){
    	$('[data-control="bx-slider"]').BXSlider();
    });
}(window.jQuery);


























