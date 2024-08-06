// create layout for contact form
;(function($) {
	// options
	function layoutContactForm(options) {
		this.options = $.extend({
			commentClass: '.form-input-comments',
			commonLayoutWrapper: '<div class="contact-form-columns">',
			inputHolder: '.form__group'
		}, options);

		this.init();
	}

	// prototype
	layoutContactForm.prototype = {
		init: function() {
			this.findElements();
			this.wrapElements();
		},
		findElements: function() {
			this.holder = $(this.options.holder);
			this.comments = this.holder.find(this.options.commentClass);
			this.inputHolder = this.holder.find(this.options.inputHolder);
		},
		wrapElements: function() {
			var self = this;

			// check if comments field exists
			if (!!self.comments.length) {
				self.inputHolder.wrapAll(self.options.commonLayoutWrapper);
				// reset textarea to default size
				self.comments.find('textarea').css({
					'width': '',
					'height': ''
				});
			}
		},
		destroy: function() {
			if (this.comments.length) {
				this.inputHolder.unwrap(this.options.commonLayoutWrapper);
			}
			this.holder.removeData('layoutContactForm');
		}
	};

	// jquery plugin
	$.fn.layoutContactForm = function(opt) {
		return this.each(function() {
			if(typeof $(this).data('layoutContactForm') === 'undefined') {
				$(this).data('layoutContactForm', new layoutContactForm($.extend(opt, { holder: this })));
			}
		});
	};
})(jQuery);