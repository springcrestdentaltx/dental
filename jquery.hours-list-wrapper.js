// hours (incl. locations version) component wrapper fix
// making similar structure both for hours and locations hours (fix missing .day__time--wrap wrapper in locations hours)
// wrap .day__time--appt (if exists) and its previous sibling to improve structure styling
;(function($) {
	// options
	function hoursListWrapper(options) {
		this.options = $.extend({
			listDay: '.day',
			listTimeWrapper: '.day__time--wrap',
			listTimeElements: '.day__time, .day__time--appt, .day__time--closed',
			listTimeDay: '.day__time',
			listTimeAppt: '.day__time + .day__time--appt',
			wrapElemTime: '<div class="day__time--wrap">',
			wrapElemAppt: '<div class="day__appt--wrap">'
		}, options);

		this.init();
	}

	// prototype
	hoursListWrapper.prototype = {
		init: function() {
			this.findElements();
			this.wrapElements();
		},
		findElements: function() {
			this.list = $(this.options.holder),
			this.listDay = this.list.find($(this.options.listDay));
		},
		wrapElements: function() {
			var self = this;

			this.listDay.each(function() {
				var listDay = $(this),
					listTimeWrapper = listDay.find(self.options.listTimeWrapper);

				// wrap all list time elements into parent if it wasn't added by CMS
				if (!listTimeWrapper.length) {
					listDay.find(self.options.listTimeElements).wrapAll(self.options.wrapElemTime);
				}

				// wrap elements that have active appointment
				if (listDay.find(self.options.listTimeAppt).length) {
					listDay.find(self.options.listTimeAppt).each(function() {
						$(this).prev(self.options.listTimeDay).andSelf().wrapAll(self.options.wrapElemAppt);
					});
				}
			});
		}
	};

	// jquery plugin
	$.fn.hoursListWrapper = function(opt) {
		return this.each(function() {
			$(this).data('hoursListWrapper', new hoursListWrapper($.extend(opt, { holder: this })));
		});
	};
})(jQuery);