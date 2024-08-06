// scrollArea plugin - create scrollable area in content holder depending on window height
(function($) {
	// detect device type
	var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

	// options
	function scrollArea(options) {
		this.options = $.extend({
			heightProp: 'height', // which property to use: height or max-height
			recalcOnPageScroll: false,// recalculate on page scroll (useful when element is not fixed by default)
			setScrollTo: '', // set scroll to another holder
			extraSpacing: 0 // subtract extra spacing from scrollable element for correct calculation (margin, padding, border, position). Both manually added or retrieved numbers (with JS) can be used.
		}, options);

		this.init();
	}

	// prototype
	scrollArea.prototype = {
		init: function() {
			var self = this,
				heightPropVars = ['height', 'max-height', 'maxHeight'],
				heightPropVarsValid;

			// height properties validation
			for (var i = 0; i < heightPropVars.length; i++) {
				if (heightPropVars[i] === self.options.heightProp) {
					heightPropVarsValid = true;
				}
			}

			if (this.options.holder && typeof heightPropVarsValid !== 'undefined') {
				this.findElements();
				this.attachEvents();
				this.setHeight();
			}
		},
		findElements: function() {
			this.scrollAreaWrapper = $(this.options.holder);
			this.scrollArea = !!this.options.setScrollTo ? this.scrollAreaWrapper.find(this.options.setScrollTo) : this.scrollAreaWrapper; // assign scroll area depending on options
		},
		attachEvents: function() {
			if(this.destroyed) return;

			var self = this,
				delay = 2000,
				timeout = null;

			// bind events
			this.onResize = function() {
				self.setHeight();
			};
			this.onScroll = function() {
				// timeout is needed to eliminate calculation issues on mobile devices (especially iOS), it waits till event has stopped and fires function only after this. Also it helps eliminate multiple event activations, what is good for overall optimization.
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					self.setHeight();
				}, delay);
			};

			// on mobiles scroll event should be always active to eliminate issue with default browsers slide in/out toolbars
			if(!!isTouchDevice) {
				$(window).on('orientationchange', this.onResize);
				$(window).on('touchend', this.onScroll);
			} else {
				// handle events
				$(window).on('resize', this.onResize);
				if(this.options.recalcOnPageScroll) {
					$(window).on('scroll', this.onScroll);
				}
			}
		},
		calcHeight: function() {
			var win = $(window),
				scrollAreaWrapperOffset = Math.round(this.scrollAreaWrapper.offset().top),
				winHeight = typeof window.innerHeight ? window.innerHeight : win.height(),
				winScrollTop = win.scrollTop();
				this.scrollAreaWrapperHeight = 0;

			if(scrollAreaWrapperOffset >= winScrollTop) {
				this.scrollAreaWrapperHeight = winHeight - (scrollAreaWrapperOffset - winScrollTop) - this.options.extraSpacing;
			} else {
				this.scrollAreaWrapperHeight = winHeight - (scrollAreaWrapperOffset - this.options.extraSpacing);
			}
		},
		setHeight: function() {
			if(this.destroyed) return;

			this.calcHeight();
			this.scrollArea.css(this.options.heightProp, this.scrollAreaWrapperHeight);
			this.scrollArea.css('overflow', 'auto');
		},
		destroy: function() {
			var self = this;
			self.destroyed = true;

			// destroy handler
			if(!!isTouchDevice) {
				$(window).off('orientationchange', this.onResize);
				$(window).off('touchend', this.onScroll);
			} else {
				// handle events
				$(window).off('resize', this.onResize);
				if(this.options.recalcOnPageScroll) {
					$(window).off('scroll', this.onScroll);
				}
			}
			// remove assigned styles
			this.scrollArea.css(this.options.heightProp, '');
			this.scrollArea.css('overflow', '');
			// remove data
			this.scrollAreaWrapper.removeData('scrollArea');
		}
	};

	// jquery plugin
	$.fn.scrollArea = function(opt){
		return this.each(function(){
			$(this).data('scrollArea', new scrollArea($.extend(opt, {holder: this})));
		});
	};
})(jQuery);