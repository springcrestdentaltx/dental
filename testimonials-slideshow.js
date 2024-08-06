+function ($) { "use strict";

	var TestimonialsSlideshow = function(element, options) {
        var lazyLoadImg = false;
        $('.lazyLoadImg').length ? lazyLoadImg = true : lazyLoadImg = false;

        function triggerScroll() {
            setTimeout(function () { $(window).trigger("scroll"); }, 100);
        }

        var self = this;

        this.$element = $(element);

        this.options = this.parseTrueFalseOptions(options);
        this.options.muted = false;

        // After initilaziantion we are going to start auto
        this.auto = this.options.auto;
        this.options.auto = false;
        
        // If its only one slide, make infiniteLoop to false in order to not make clones
        if(this.options.numSlides == 1){
            this.auto = false;
            this.options.infiniteLoop = false;
        }

        // If mouseover pause option is checked 
        if (self.options.autoHover == 1) self.options.autoHoverModified = true;

        var callbacks = {
            onSlideAfter: function() {
                if(self.options.auto){
                    self.$element.stopAuto();
                    self.$element.startAuto();   
                }
                if (lazyLoadImg) triggerScroll();     
            },
            onSliderLoad: function () {
                self.$element.css("visibility", "visible");
                self.$wrapper = self.$element.closest('.bx-wrapper');
                self.$viewport = self.$wrapper.find('.bx-viewport');

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
                            self.$element.startAuto();
                        }
                    );
                }

                if(self.options.easing != null){
                    self.options.useCSS = false;
                }

                if(self.auto){
                    self.options.auto = true;
                    self.$element.startAuto();
                    self.makePauseTestimonialsSlideshowButton();
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
        this.maxHeightListItem(this.$element);

        return this;
    }

    TestimonialsSlideshow.prototype.attachEvents = function(){
        var self = this;

        $('.js-testimonials-layout-settings').on('click', '.testimonials-pause-slideshow', function(e, data){
            $(this).hide();
            self.$element.stopAuto();
            self.options.auto = false;
            $('.js-testimonials-layout-settings .testimonials-play-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $('.js-testimonials-layout-settings').on('click', '.testimonials-play-slideshow', function(e, data){
            $(this).hide();
            self.$element.startAuto();
            self.options.auto = true;
            $('.js-testimonials-layout-settings .testimonials-pause-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $('body').keypress(function(e){
            var key = e.which;
            if(key == 13){
                if($('.js-testimonials-layout-settings').find('.play-slideshow').is(':focus')){
                    $('.js-testimonials-layout-settings').find('.play-slideshow').trigger('click', { kb: true});
                }

                if($('.js-testimonials-layout-settings').find('.pause-slideshow').is(':focus')){
                    $('.js-testimonials-layout-settings').find('.pause-slideshow').trigger('click', { kb: true});
                }
            }
        });

        $('.testimonials-slider').off('click').on('click', '.expand', function(event){
            var $ul = $(this).closest('.testimonials-slider');
            $ul.closest('.bx-viewport').height(self.maxHeightListItem($ul));
        });

        var winResizeTimer;
        $(window).resize(function () {
            clearTimeout(winResizeTimer);
            winResizeTimer = setTimeout(function () {
                self.maxHeightListItem(self.$element);
            }, 250);
        });

    }

    /**
     * Max li height of ul
     * 
     * @param  {[ jquery element ]} $ul the parent
     * @return {[integer]}
     */
    TestimonialsSlideshow.prototype.maxHeightListItem = function($ul) {
      var self = this;
      var $lis = self.$element,
          maxHeight = 0,
          $items;

      $lis.each(function() {
        $items = $(this).find(".testimonials-item");
      });

      $items.closest("li").height("auto");

      // Fade mode sets hide to the items - initial show of the items and get the heightest item in list
      if (self.options.mode == "fade") {
          $items.each(function () {
              var itemLi = $(this).closest("li"),thisH;
              if (itemLi.css("display") == "none") {
                  itemLi.css({display: "block"});
                  thisH = $(this).outerHeight(true);
                  itemLi.css({display: "none"});
              } else {
                  thisH = $(this).outerHeight(true);
              }
              if (thisH > maxHeight) maxHeight = thisH;
          });
      } else {
          maxHeight = self.maxHeight($items);
      }
      var $itemWrap = self.getElemOuterDistance($lis.find('.testimonials-items-wrap'));
      maxHeight += $itemWrap.heightDistance;
      $items.closest("li").height(maxHeight);

      //redraw slider after setting new height for the list items
      self.drawSlider();

      // drawSlider() sets style top left to 0 for vertical and horizontal mode also sets width of 100px to the bx-clone items
      // Ooverride drawSlider() styles with appropriate values
      var bxItemMaxWidth = $lis.find('li.items-container:not(.bx-clone)').width(),
          bxItemMaxHeight = $lis.find('li.items-container:not(.bx-clone)').height(),
          bxCloneElem = $lis.find('li.bx-clone');
      bxCloneElem.width(bxItemMaxWidth);
      bxCloneElem.height(bxItemMaxHeight);

      if (bxCloneElem.length > 0) {
        switch (self.options.mode) {
            case 'horizontal':
                if ($lis.css('left') == '0px') $lis.css({'left': -bxItemMaxWidth + 'px'})
                break;
            case 'vertical':
                if ($lis.css('top') == '0px') $lis.css({'top': -bxItemMaxHeight + 'px'})
                break;
            default:
        }
      }

      return maxHeight;
    };

    TestimonialsSlideshow.prototype.parseTrueFalseOptions = function(options, skip){
        for (var key in options) {
          if (options.hasOwnProperty(key) && TestimonialsSlideshow.BOOLEANS.indexOf(key) != -1) {
            options[key] = !!options[key];
          }
        }

	  	return options;
    }

    TestimonialsSlideshow.prototype.initializeSlider = function(){
        this.$bxSlider = this.$element.bxSlider(this.options);
    }

    TestimonialsSlideshow.prototype.drawSlider = function(){
        this.$bxSlider.redrawSlider();
    }

    TestimonialsSlideshow.prototype.destSlider = function(){
        if(this.$bxSlider.length){
            this.$bxSlider.destroySlider();

            $('.js-testimonials-layout-settings .wrap__bx-controls').remove();
        }
    }

    TestimonialsSlideshow.prototype.maxHeight = function($items){
        var maxHeight = 0;

        $items.each(function(){
            if(maxHeight < $(this).outerHeight(true)){
                maxHeight = $(this).outerHeight(true);
            }
        });

        return maxHeight;
    }

     /**
      * Calculates the outer margin/padding size of the dom element and returns outerHeight and outerWidth values
      * @param  {[ jquery element ]}
      * @return {[integer]}
      */
     TestimonialsSlideshow.prototype.getElemOuterDistance = function ($element) {
         var outerHeightDistance = $element.outerHeight(true) - $element.height(),
             outerWidthDistance = $element.outerWidth(true) - $element.width();
         return {
             heightDistance: outerHeightDistance,
             widthDistance: outerWidthDistance
         };
     }

    TestimonialsSlideshow.prototype.makePauseTestimonialsSlideshowButton = function(){
        var self = this;

        var htmlPauseTestimonialsSlideshow = [
            '<div class="wrap_pause-play">',
                '<div class="pause-slideshow testimonials-pause-slideshow" aria-label="icon pause" title="Pause slideshow" tabindex="0">',
                    '<span class="icon icon-pause"></span>',
                '</div>',
                '<div class="play-slideshow testimonials-play-slideshow" aria-label="icon play" style="display: none" title="Play slideshow" tabindex="0">',
                    '<span class="icon icon-play"></span>',
                '</div>',
            '</div>'
        ];

        $('.js-testimonials-layout-settings').find('.bx-wrapper .bx-controls').append(htmlPauseTestimonialsSlideshow.join(''));
    }

    TestimonialsSlideshow.DEFAULTS = {
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

    TestimonialsSlideshow.BOOLEANS = [
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

    var old = $.fn.testimonialSlideshow;

    $.fn.testimonialSlideshow = function(option) {
        var args = arguments, result, obj;
        
        var $this = $(this);

        var options = $.extend({}, TestimonialsSlideshow.DEFAULTS, $this.data(), typeof option == 'object' && option);
        var data = '';

        return new TestimonialsSlideshow(this, options);
    };

    $.fn.testimonialSlideshow.Constructor = TestimonialsSlideshow

    $.fn.testimonialSlideshow.noConflict = function () {
        $.fn.testimonialSlideshow = old
    }
}(window.jQuery);