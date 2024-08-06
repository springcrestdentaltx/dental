// simple inline image parallax plugin
;(function($) {
	// options
	function inlineImageParallax(options) {
		this.options = $.extend({
			elems: '.parallaxed__item',
			position: 'top' // top or left
		}, options);

		this.init();
	}

	// prototype
	inlineImageParallax.prototype = {
		init: function() {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.startParallax();
			}
		},
		findElements: function() {
			this.holder = $(this.options.holder);
			this.elems = this.holder.find($(this.options.elems));
		},
		attachEvents: function() {
			this.bindHandlers(['onWindowChange']);
			$(window).bind('scroll resize orientationchange', this.onWindowChange);
		},
		onWindowChange: function() {
			if (this.destroyed) return;
			this.startParallax();
		},
		bindHandlers: function(handlersList) {
			var self = this;
			$.each(handlersList, function(index, handler) {
				var origHandler = self[handler];
				self[handler] = function() {
					return origHandler.apply(self, arguments);
				};
			});
		},
		startParallax: function() {
			var self = this,
				winPosY = $(window).scrollTop(),
				winPosX = $(window).scrollLeft();

			this.elems.each(function() {
				var elems = $(this);

				if (elems.css('background-image') !== 'none') {
					if (self.options.position === 'top') {
						elems.css({
							transform: "translate3d(0, " + winPosY + 'px' + ", 0)"
						});
					} else if (self.options.position === 'left') {
						elems.css({
							transform: "translate3d( " + winPosX + 'px' + ", 0, 0)"
						});
					}
				}
			});
		},
		destroy: function() {
			var self = this;
			self.destroyed = true;

			// destroy handler
			$(window).unbind('scroll resize orientationchange', this.onWindowChange);
			// remove assigned styles
			self.elems.css('transform', '');
			// remove data
			this.holder.removeData('inlineImageParallax');
		}
	};

	// jquery plugin
	$.fn.inlineImageParallax = function(opt) {
		return this.each(function() {
			$(this).data('inlineImageParallax', new inlineImageParallax($.extend(opt, { holder: this })));
		});
	};
})(jQuery);