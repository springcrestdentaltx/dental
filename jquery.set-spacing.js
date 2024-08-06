// set spacing depending on width/height of specified element in options
;(function($) {
	// options
	function setSpacing(options) {
		this.options = $.extend({
			takeSizeFrom: '.element',
			takeSize: 'height', // width or height
			spacingProp: 'padding-top', // 'left', 'right', 'top', 'bottom', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'
			flexible: true
		}, options);
		this.init();
	}

	// prototype
	setSpacing.prototype = {
		init: function() {
			var self = this,
				spacingVars = ['left', 'right', 'top', 'bottom', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'],
				spacingVarsValid;

			// spacing properties validation
			for (var i = 0; i < spacingVars.length; i++) {
				if (spacingVars[i] === self.options.spacingProp) {
					spacingVarsValid = true;
				}
			}

			if (this.options.holder && typeof spacingVarsValid !== 'undefined') {
				this.findElements();
				this.setElemSpacing();
				if(this.options.flexible) return self.attachEvents();
			}
		},
		findElements: function() {
			this.elements = {
				holder: $(this.options.holder),
				takeSizeFrom: $(this.options.takeSizeFrom)
			};
		},
		attachEvents: function() {
			this.bindHandlers(['onWindowResize']);
			$(window).bind('resize orientationchange', this.onWindowResize);
		},
		onWindowResize: function() {
			if (this.destroyed) return;
			this.setElemSpacing();
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
		setElemSpacing: function() {
			if (this.options.takeSize === 'width') {
				this.elements.holder.css(this.options.spacingProp, this.elements.takeSizeFrom.outerWidth());
			} else if (this.options.takeSize === 'height') {
				this.elements.holder.css(this.options.spacingProp, this.elements.takeSizeFrom.outerHeight());
			}
		},
		destroy: function() {
			var self = this;

			// destroy handler
			if(self.options.flexible) {
				self.destroyed = true;
				$(window).unbind('resize orientationchange', self.onWindowResize);
			}
			// remove assigned styles
			self.elements.holder.css(this.options.spacingProp, '');
			// remove data
			self.elements.holder.removeData('setSpacing');
		}
	};

	// jquery plugin
	$.fn.setSpacing = function(opt) {
		return this.each(function() {
			$(this).data('setSpacing', new setSpacing($.extend(opt, { holder: this })));
		});
	};
})(jQuery);