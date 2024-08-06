(function ($) { "use strict";
    var MyHighslide = function (element, options) {
    	var self = this;
    	this.$el = $(element);
        this.options = options;

        this.init();

       	$(window).resize(function(){
       		self.contentPosition();
            var check = hs.getExpander();
            if (check !== null) hs.getExpander().reflow();
    	});
    };

    /*
        MyHighslide initilization
     */ 
    MyHighslide.prototype.init = function(){
    	hs.graphicsDir = this.options.graphicsDir + '/';
		hs.align = 'center';
		hs.transitions = ['expand', 'crossfade'];
		hs.fadeInOut = true;
		hs.dimmingOpacity = 0.8;
		hs.captionEval = null; //'this.thumb.alt';
		hs.marginBottom = 105; // make room for the thumbstrip and the controls
		hs.allowSizeReduction = true;
		//hs.numberPosition = null;
		hs.expandCursor = null; // null disables
		hs.restoreCursor = null; // null disables
		hs.showCredits = false;
		hs.onDrag = false;
		hs.preserveContent = false;
		hs.cacheAjax = false;

		this.contentPosition();

		if(this.options.showBorder){
			hs.outlineType = 'rounded-white';//'rounded-white';
		} else {
			hs.outlineType = null
		}

		// Add the slideshow providing the controlbar and the thumbstrip
		if(this.options.showThumbnails){
			hs.addSlideshow({
				interval: 5000,
				repeat: true,
				useControls: false,
				overlayOptions: {
					className: 'text-controls',
					position: 'bottom center',
					relativeTo: 'viewport',
					offsetY: -60
				},
				thumbstrip: {
					position: 'bottom center',
					mode: 'horizontal',
					relativeTo: 'viewport'
				}
			});
		}

        /*** commented out because of SMBTPL-11218

        hs.addEventListener(window, 'resize', function() {
			// SMBWMGR-4632: Don't reload the elements if in full screen mode
			if (document.fullscreenElement || document.webkitFullscreenElement ||
				document.mozFullScreenElement || document.msFullscreenElement) {
				return;
			}

            var expanders = hs.expanders,
                expandDuration = hs.expandDuration,
                restoreDuration = hs.restoreDuration,
                i = expanders.length,
                a, exp;
            hs.expandDuration = 0;
            hs.restoreDuration = 0;
            while (i--) {
                exp = expanders[i];
                if (exp) {
                    a = exp.a;
                    exp.close();
                    a.onclick();
                }
            }
            setTimeout(function() {
                hs.expandDuration = expandDuration;
                hs.restoreDuration = restoreDuration;
            }, expandDuration);
        }); 
        ***/
    };

    MyHighslide.prototype.contentPosition = function(){

    	if(this.options.layout == 'rightText' && this.getDevice() == 'desktop'){
			hs.captionOverlay.position = "rightpanel";
			hs.captionOverlay.width = "220px";
		} else {
			hs.captionOverlay.position = "below";
		}
    };

    MyHighslide.DEFAULTS = {
        
    };

    MyHighslide.prototype.getDevice = function(){
    	var width = $(window).width();

    	if(width < 768)
    		return 'mobile';

    	if(width < 1025)
    		return 'tablet';

    	return 'desktop';
    };

    var old = $.fn.highSlide;

    $.fn.highSlide = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var result = undefined;

        this.each(function(){
            var $this   = $(this);
            var options = $.extend({}, MyHighslide.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var data = new MyHighslide(this, options);
            if (typeof option == 'string') result = data[option].apply(data, args);
            if (typeof result != 'undefined') return false
        });
        
        return result ? result : this;
    };

    $.fn.highSlide.Constructor = MyHighslide;

    $.fn.highSlide.noConflict = function () {
        $.fn.highSlide = old;
        return this;
    };

    $(document).on('ready', function(){
        $('[data-control=highslide]').highSlide();
    });
})(window.jQuery);