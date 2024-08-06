+function ($) { "use strict";
	var FeaturedArticlesSlideshow = function(element, options) {
        var self = this;

        this.$element = $(element);

        this.options = this.parseTrueFalseOptions(options);
        this.options.muted = false;

        // After initilaziantion we are going to start auto
        this.auto = this.options.auto;
        this.options.auto = false;
        
        // If its only one slide, make infiniteLoop to false in order to not make clones
        // if(this.options.numSlides == 1){
        //     this.auto = false;
        //     this.options.infiniteLoop = false;
        // }

        var lazyLoadImg = false;
        $('.lazyLoadImg').length ? lazyLoadImg = true : lazyLoadImg = false;

        function triggerScroll() {
            setTimeout(function () { $(window).trigger("scroll"); }, 100);
        }

        var callbacks = {
            onSlideAfter: function(currentSlide, totalSlides, currentSlideHtmlObject) {
                if(self.options.auto){
                    self.$element.stopAuto();
                    self.$element.startAuto();

                    // if the slider is not infinite and current slide is equal to total slides disable auto
                    if(!self.options.infinityLoop && (currentSlideHtmlObject + 1) == self.$bxSlider.getSlideCount()){
                        self.$element.stopAuto();
                        self.options.auto = false;
                    }
                    if (lazyLoadImg) triggerScroll();  
                }   
            },
            onSliderLoad: function () {
                self.$element.css("visibility", "visible");
                self.$wrapper = self.$element.closest('.bx-wrapper');
                self.$viewport = self.$wrapper.find('.bx-viewport');
               // self.$wrapper.find('.bx-viewport').css('height', '');

                if(self.options.easing == '')
                    self.options.easing = null;

                if(self.options.controlsHover){
                    $(".bx-controls-direction", self.$wrapper).hide();

                    self.$wrapper.hover(
                        function () { $(".bx-controls-direction", $(this)).fadeIn(300); },
                        function () { $(".bx-controls-direction", $(this)).fadeOut(300); }
                    );
                }

                if(self.options.autoHoverModified){
                    self.$wrapper.hover(
                        function(){
                            self.$element.stopAuto();
                        },
                        function(){

                        }
                    );
                }

                if(self.options.easing != null){
                    self.options.useCSS = false;
                }

                if(self.auto){
                    self.options.auto = true;
                    self.$element.startAuto();
                    self.makePauseFeaturedArticlesSlideshowButton();
                }

                self.$element.closest('.bx-wrapper').find('.bx-controls').wrapAll("<div class='wrap__bx-controls' />");
                self.$element.closest('.bx-wrapper').find(".wrap_pause-play, .wrap_on-off, .bx-pager " ).wrapAll( "<div class='bx-controls-buttons' />");
            },
            onSlideNext: function() {
                if (lazyLoadImg) triggerScroll();  
            },
            onSlidePrev: function() {
                if (lazyLoadImg) triggerScroll();  
            }
        };

        $.extend(this.options, callbacks);

        this.attachEvents();
        this.initializeSlider();

        return this;
    }

    FeaturedArticlesSlideshow.prototype.attachEvents = function(){
        var self = this,
        $faLayoutSettings = self.$element.closest('.js-featuredarticles-layout-settings');

        $faLayoutSettings.on('click', '.featuredarticles-pause-slideshow', function(e, data){
            $(this).hide();
            self.$element.stopAuto();
            self.options.auto = false;
            $faLayoutSettings.find('.featuredarticles-play-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $faLayoutSettings.on('click', '.featuredarticles-play-slideshow', function(e, data){
            $(this).hide();
            self.$element.startAuto();
            self.options.auto = true;
            $faLayoutSettings.find('.featuredarticles-pause-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $('body').keypress(function(e){
            var key = e.which;
            if(key == 13){
                if($faLayoutSettings.find('.play-slideshow').is(':focus')){
                    $faLayoutSettings.find('.play-slideshow').trigger('click', { kb: true});
                }

                if($faLayoutSettings.find('.pause-slideshow').is(':focus')){
                    $faLayoutSettings.find('.pause-slideshow').trigger('click', { kb: true});
                }
            }
        });
    }

    FeaturedArticlesSlideshow.prototype.parseTrueFalseOptions = function(options, skip){
        for (var key in options) {
          if (options.hasOwnProperty(key) && FeaturedArticlesSlideshow.BOOLEANS.indexOf(key) != -1) {
            options[key] = !!options[key];
          }
        }

	  	return options;
    }

    FeaturedArticlesSlideshow.prototype.initializeSlider = function(){
        this.$bxSlider = this.$element.bxSlider(this.options);
    }

    FeaturedArticlesSlideshow.prototype.destSlider = function(){
        if(this.$bxSlider.length){
            this.$bxSlider.destroySlider();

            this.$element.closest('.js-featuredarticles-layout-settings').find('.wrap__bx-controls').remove();
        }
    }

    FeaturedArticlesSlideshow.prototype.maxHeight = function($items){
        var maxHeight = 0;

        $items.each(function(){
            if(maxHeight < $(this).height()){
                maxHeight = $(this).height();
            }
        });

        return maxHeight;
    }

    FeaturedArticlesSlideshow.prototype.makePauseFeaturedArticlesSlideshowButton = function(){
        var self = this;

        var htmlPauseFeaturedArticlesSlideshow = [
            '<div class="wrap_pause-play">',
                '<div class="pause-slideshow featuredarticles-pause-slideshow" aria-label="icon pause" title="Pause slideshow" tabindex="0">',
                    '<span class="icon icon-pause"></span>',
                '</div>',
                '<div class="play-slideshow featuredarticles-play-slideshow" aria-label="icon play" style="display: none" title="Play slideshow" tabindex="0">',
                    '<span class="icon icon-play"></span>',
                '</div>',
            '</div>'
        ];

        self.$element.closest('.js-featuredarticles-layout-settings').find('.bx-wrapper .bx-controls').append(htmlPauseFeaturedArticlesSlideshow.join(''));

    }

    FeaturedArticlesSlideshow.DEFAULTS = {
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

    FeaturedArticlesSlideshow.BOOLEANS = [
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

    var old = $.fn.featuredArticlesSlideshow;

    $.fn.featuredArticlesSlideshow = function(option) {
        var args = arguments, result, obj;
        
        var $this = $(this);

        var options = $.extend({}, FeaturedArticlesSlideshow.DEFAULTS, $this.data(), typeof option == 'object' && option);
        var data = '';

        return new FeaturedArticlesSlideshow(this, options);
    };

    $.fn.featuredArticlesSlideshow.Constructor = FeaturedArticlesSlideshow

    $.fn.featuredArticlesSlideshow.noConflict = function () {
        $.fn.featuredArticlesSlideshow = old
    }

    $(document).ready(function(){
        var $faSection = $('[data-control="featuredarticles-slider"]')
        if ($faSection.length) {
            $faSection.each(function () {
                $(this).featuredArticlesSlideshow();
            });
        }
    });
}(window.jQuery);