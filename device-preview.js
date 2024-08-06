+function ($) { "use strict";
	var DevicePreview = function($el, options) {
		this.$el = $el;
		this.$gridContainer = this.$el.find('.grid-container');
        this.$sliderContainer = this.$el.find('#gallery-bx-slider');
        this.options = options;
        this.prevDevice = null;
        this.$items = this.$el.find('.gallery-grid--item').clone();

		this.processDeviceColumns();
		this.attachEvents();
    }

    DevicePreview.prototype.attachEvents = function(){
    	var self = this;

    	$(window).resize(function(){
    		self.processDeviceColumns();
    	});
    }

    DevicePreview.prototype.processDeviceColumns = function(){
    	if(this.options.layoutType == 'grid_2'){
            this.doGrid();
        } else if(this.options.layoutType == 'grid_1'){
            this.doMasonry()
        } else if(this.options.layoutType == 'slider_1'){
            this.doSlideshow();
        }
    }

    DevicePreview.prototype.doMasonry = function(){
        var device = this.getDevice();

        if(this.prevDevice == device){
            return;
        } else {
            this.prevDevice = device;
        }

        var columns = this.options[device + 'Columns'];

        var $items = this.$el.find('.gallery-grid--item');

        $items.each(function(){
            $(this).removeClass(function (index, className) {
                return (className.match (/\bgallery-grid--columns\S+/g) || []).join(' ');
            });
        });

        $items.each(function(){
            $(this).addClass('gallery-grid--columns-' + columns);
        });

        let videoEl = $items.find('[data-setup-run]');
		videoEl.each(function () {
			videojs(this, $(this).data('setupRun'), function () {
				var player = this,
					options = player.options();
			});
		});

        this.$el.find('[data-control="masonry"]').masonryFunction();

        if (this.$gridContainer.length) {
            this.$gridContainer.trigger('html_restructured');
        } else {
            this.$el.trigger('html_restructured');
        }
    }

    DevicePreview.prototype.doGrid = function(){
        var device = this.getDevice();

        if(this.prevDevice == device){
            // We want images to be scaled when window is resized
            if(this.options.ratio != 'none'){
                this.$el.imgScale();
            }

            return;
        } else {
            this.prevDevice = device;
        }

        var columns = this.options[device + 'Columns'];

        this.resetGridHTML();

        this.$items.each(function(){
            $(this).removeClass(function (index, className) {
                return (className.match (/\bgallery-grid--columns\S+/g) || []).join(' ');
            });
        });

        this.$items.each(function(){
            $(this).addClass('gallery-grid--columns-' + columns);
        });

        var rows = Math.ceil(this.$items.length/columns);

        for(var row = 1; row <= rows; row++){
            var $row = $('<div class="gallery-row"></div>');

            this.$gridContainer.append($row);

            for(var j = (row - 1) * columns; j < row * columns; j++){
                if(typeof this.$items[j] == "undefined")
                    continue;

                var $itm = $(this.$items[j]);

                if($itm.find('.highslide-caption').length == 0){
                    var $a = $itm.find('a.highslide');

                    if($a.data('hasCaption')){
                        var html = $('#caption-' + $a.attr('id').split('-')[1]).html();

                        if(html != undefined){
                            html = html.replace("display: none", "");
                            html = html.replace('highslide-caption-helper', 'highslide-caption');
                            $a.after(html);
                        }
                    }
                }

                $row.append($(this.$items[j]).clone());
            }
        }

        // After the html restruction make scale
        if(this.options.ratio != 'none'){
            this.$el.imgScale();
        }

        this.$gridContainer.trigger('html_restructured');
    }

    DevicePreview.prototype.doSlideshow = function(){
        var device = this.getDevice();

        if(this.prevDevice == device){
            // We want images to be scaled when window is resized
            if(this.options.ratio != 'none'){
                this.$el.imgScale();
            }

            return;
        } else {
            this.prevDevice = device;
        }

        var columns = this.options[device + 'Columns'];

        if(this.Slider != undefined){
            var $lis = $(this.$el.find('#gallery-bx-slider > li'));

            $lis.each(function(){
                if($(this).hasClass('bx-clone')){
                    $(this).remove();
                }
            });

            this.Slider.destSlider();
        }

        this.resetSlideshowHTML();

        this.$items.each(function(){
            $(this).removeClass(function (index, className) {
                return (className.match (/\bgallery-grid--columns\S+/g) || []).join(' ');
            });
        });

        this.$items.each(function(){
            $(this).addClass('gallery-grid--columns-' + columns);
        });

        var slides = Math.ceil(this.$items.length/columns);

        for(var slide = 1; slide <= slides; slide++){
            var $li = $('<li class="items-container"></li>');
            var $itemsWrapper = $('<div class="gallery-items-wrap"></div>');

            this.$sliderContainer.append($li);
            $li.append($itemsWrapper);

            for(var j = (slide - 1) * columns; j < slide * columns; j++){
                if(typeof this.$items[j] == "undefined")
                    continue;

                var $itm = $(this.$items[j]);

                if($itm.find('.highslide-caption').length == 0){
                    var $a = $itm.find('a.highslide');

                    if($a.data('hasCaption')){
                        var html = $('#caption-' + $a.attr('id').split('-')[1]).html();

                        if(html != undefined){
                            html = html.replace("display: none", "");
                            html = html.replace('highslide-caption-helper', 'highslide-caption');
                            $a.after(html);
                        }
                    }
                }

                $itemsWrapper.append($(this.$items[j]).clone());
            }
        }

        // After the html restruction make scale
        if(this.options.ratio != 'none'){
            this.$el.imgScale();
        }

        window.gallerySlider = this.Slider = this.$sliderContainer.slideshow();
        window.gallerySliderArr.push(this.Slider.$bxSlider);

        this.$sliderContainer.trigger('html_restructured');
    }

    DevicePreview.prototype.resetGridHTML = function(){
        var self = this;

        self.$gridContainer.html('');
    }

    DevicePreview.prototype.resetSlideshowHTML = function(){
        var self = this;

        self.$sliderContainer.html('');
    }

    DevicePreview.prototype.getDevice = function(){
    	var width = $(window).width();

    	if(width < 752)
    		return 'mobile';

    	if(width < 1025)
    		return 'tablet';

    	return 'desktop';
    }

    var old = $.fn.DevicePreview;

    $.fn.devicePreview = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this);

            var options = $.extend({}, $this.data(), typeof option == 'object' && option);
            var data = '';

            $this.data('DevicePreview', (data = new DevicePreview($this, options)));

            if (typeof result != 'undefined') return false;
        });

        return result ? result : this;
    };

    $.fn.devicePreview.Constructor = DevicePreview

    $.fn.devicePreview.noConflict = function () {
        $.fn.devicePreview = old
        return this
    }

    $(window).on('load', function(){
        var $devicePreview = $('[data-ctrl="device-preview"]');
        window.gallerySliderArr = [];
        if ($devicePreview.length) {
            $devicePreview.each(function () {
                $(this).devicePreview();
            });
        }
    });

}(window.jQuery);