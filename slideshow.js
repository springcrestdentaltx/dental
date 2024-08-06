+function ($) { "use strict";
	var Slideshow = function(element, options) {
        var self = this;

        this.$element = $(element);
        this.$topWrapper = $(element).closest('.gallery');

        this.options = this.parseTrueFalseOptions(options);
        this.options.muted = false;

        function triggerScroll() {
            setTimeout(function () { $(window).trigger("scroll"); }, 100);
        }
        // If its only one slide, make infiniteLoop to false in order to not make clones
        if(this.options.count == 1){
            this.options.infiniteLoop = false;
        }

        this.auto = this.options.auto;
        this.options.auto = false;

        var callbacks = {
            onSlideAfter: function() {
                if(self.options.auto){
                    self.$element.stopAuto();
                    self.$element.startAuto();
                }
            },
            onSliderLoad: function () {
                self.$element.css("visibility", "visible");
                self.$wrapper = self.$element.closest('.bx-wrapper');
                self.$viewport = self.$wrapper.find('.bx-viewport');
               // self.$wrapper.find('.bx-viewport').css('height', '');

                if(self.$element.getSlideCount() > 1) {
                    self.options.pager = true;
                    $(".bx-pager").show();
                } else {
                    self.options.pager = false;
                    $(".bx-pager").hide();
                }

                if(self.options.easing == '')
                    self.options.easing = null;

                if(self.options.controlsHover && self.$element.getSlideCount() > 1){
                    $(".bx-controls-direction", self.$wrapper).add(".bx-pager").hide();

                    self.$wrapper.hover(
                        function () { $(".bx-controls-direction", $(this)).add(".bx-pager").fadeIn(300); },
                        function () { $(".bx-controls-direction", $(this)).add(".bx-pager").fadeOut(300); }
                    );
                }

                if(self.options.autoHover){
                    self.$wrapper.hover(
                        function(){
                            if(self.options.auto){
                                self.$element.stopAuto();
                            }
                        },
                        function(){
                            if(self.options.auto){
                                self.$element.startAuto();
                            }
                        }
                    );
                }

                if(self.options.easing != null){
                    self.options.useCSS = false;
                }



                if(self.auto){
                    self.options.auto = true;
                    self.$element.startAuto();
                    self.makePauseSlideshowButton();
                }

                // SMBWMGR-3963
                // if(self.options.videosCount > 0){
                //     self.makeSoundOffButton();
                // }

                self.removeHighslideInClones();
                self.addWrappers();
            },
            onSlideNext: function() {
            },
            onSlidePrev: function() {
            }
        };

        $.extend(this.options, callbacks);

        this.attachEvents();
        this.initializeSlider();

        return this;
    }

    Slideshow.prototype.attachEvents = function(){
        var self = this;

        self.$topWrapper.find('.gallery-slider').on('click', '.gallery-pause-slideshow', function(e, data){
            $(this).hide();
            self.$element.stopAuto();
            self.options.auto = false;
            self.$topWrapper.find('.gallery-slider .gallery-play-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        self.$topWrapper.find('.gallery-slider').on('click', '.gallery-play-slideshow', function(e, data){
            $(this).hide();
            self.$element.startAuto();
            self.options.auto = true;
            self.$topWrapper.find('.gallery-slider .gallery-pause-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        self.$topWrapper.find('.gallery-slider').on('click', '.sound-off', function(e, data){
            $(this).hide();
            self.options.muted = true;
            self.$element.stopAuto();
            self.$topWrapper.find('.gallery-slider .sound-on').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        self.$topWrapper.find('.gallery-slider').on('click', '.sound-on', function(e, data){
            $(this).hide();
            self.options.muted = false;
            self.$element.startAuto();
            self.$topWrapper.find('.gallery-slider .sound-off').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $('body').keypress(function(e){
            var key = e.which;
            if(key == 13){
                if(self.$topWrapper.find('.gallery-slider .play-slideshow').is(':focus')){
                    self.$topWrapper.find('.gallery-slider .play-slideshow').trigger('click', { kb: true});
                }

                if(self.$topWrapper.find('.gallery-slider .pause-slideshow').is(':focus')){
                    self.$topWrapper.find('.gallery-slider .pause-slideshow').trigger('click', { kb: true});
                }

                if(self.$topWrapper.find('.gallery-slider .sound-off').is(':focus')){
                    self.$topWrapper.find('.gallery-slider .sound-off').trigger('click', { kb: true});
                }

                if(self.$topWrapper.find('.gallery-slider .sound-on').is(':focus')){
                    self.$topWrapper.find('.gallery-slider .sound-on').trigger('click', { kb: true});
                }
            }
        });
    }

    Slideshow.prototype.parseTrueFalseOptions = function(options, skip){
        for (var key in options) {
          if (options.hasOwnProperty(key) && Slideshow.BOOLEANS.indexOf(key) != -1) {
            options[key] = !!options[key];
          }
        }

	  	return options;
    }

    Slideshow.prototype.addWrappers = function(){
        var self = this;

        self.$element.closest('.bx-wrapper').find('.bx-controls').wrapAll("<div class='wrap__bx-controls' />");
        self.$element.closest('.bx-wrapper').find(".bx-pager, .wrap_pause-play").wrapAll( "<div class='bx-controls-buttons' />");
    }

    Slideshow.prototype.initializeSlider = function(){
        this.$bxSlider = this.$element.bxSlider(this.options);
    }

    Slideshow.prototype.destSlider = function(){
        if(this.$bxSlider.length){
            this.$bxSlider.destroySlider();
            this.$topWrapper.find('.gallery-slider .wrap__bx-controls').remove();

            // $('.gallery-slider .gallery-pause-slideshow').remove();
            // $('.gallery-slider .gallery-play-slideshow').remove();
            // $('.gallery-slider .sound-on').remove();
            // $('.gallery-slider .sound-off').remove();
        }
    }

    Slideshow.prototype.makePauseSlideshowButton = function(){
        var self = this;

        var htmlPauseSlideshow = [
            '<div class="wrap_pause-play">',
                '<div class="pause-slideshow gallery-pause-slideshow" aria-label="icon pause" title="Pause slideshow" tabindex="0">',
                    '<span class="icon icon-pause"></span>',
                '</div>',
                '<div class="play-slideshow gallery-play-slideshow" aria-label="icon play" style="display: none" title="Play slideshow" tabindex="0">',
                    '<span class="icon icon-play"></span>',
                '</div>',
            '</div>'
        ];

        self.$topWrapper.find('.gallery-slider .bx-wrapper .bx-controls').append(htmlPauseSlideshow.join(''));
    }

    // Slideshow.prototype.makeSoundOffButton = function(){
    //     var self = this;

    //     var htmlPauseSlideshow = [
    //         '<div class="wrap_on-off">',
    //             '<div class="sound-off" tabindex="0">',
    //                 '<span class="cicon cicon-volume-mute"></span>',
    //             '</div>',
    //             '<div class="sound-on" aria-label="icon volume-up" style="display: none" tabindex="0">',
    //                 '<span class="icon icon-volume-up"></span>',
    //             '</div>',
    //         '</div>'
    //     ];

    //     $('.gallery-slider').find('.bx-wrapper .bx-controls').append(htmlPauseSlideshow.join(''));

    // }

    Slideshow.prototype.removeHighslideInClones = function(){
        var me = this;
        var $clones = me.$element.find('.bx-clone');

        $clones.each(function(index){
            var $clone = $(this);
            var $hs = $clone.find('.highslide');

            $hs.removeClass('highslide');
            $hs.removeAttr('onclick');
        });
    }

    Slideshow.DEFAULTS = {
    	pager: true,
    	controls: true,
    	autoControls: false,
        autoHoverModified: false,
        autoHover: false,
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
        useCSS: false,
        autoPlayVideo: true
    }

    Slideshow.BOOLEANS = [
        'pager',
        'controls',
        'autoControls',
        'auto',
        'infiniteLoop',
        'randomStart',
        'controlsHover',
        'responsive',
        'autoHoverModified'
    ]

    var old = $.fn.slideshow;

    $.fn.slideshow = function(option) {
        var args = arguments, result, obj;

        var $this = $(this);

        var options = $.extend({}, Slideshow.DEFAULTS, $this.data(), typeof option == 'object' && option);
        var data = '';

        return new Slideshow(this, options);
    };

    $.fn.slideshow.Constructor = Slideshow

    $.fn.slideshow.noConflict = function () {
        $.fn.slideshow = old
    }
}(window.jQuery);
