+function ($) { "use strict";
	var TestimonialsComposer = function($el, options) {
		this.$el = $el;
		this.$gridContainer = this.$el.find('.testimonials-grid');
        this.$sliderContainer = this.$el.find('.testimonials-slider');
        this.options = options;
        this.prevDevice = null;
        this.$items = this.$el.find('.testimonials-item').clone();

		this.processDeviceColumns();
		this.attachEvents();
    }

    TestimonialsComposer.prototype.attachEvents = function(){
        var self = this;
        var currentDevice = self.getDevice();

    	$(window).resize(function(){
            var resizedDevice = self.getDevice();
            if(currentDevice != resizedDevice) {
                self.processDeviceColumns();
                self.readMoreExpand();
                currentDevice = resizedDevice;
            } 
        });

        if (self.options.readMore) self.readMoreExpand();

        // trigger widow resize to fix the slider width/height caluclations by redrawing after breakHtmlContent function
        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
            var evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
        } else {
            window.dispatchEvent(new Event('resize'));

        }
    }

    TestimonialsComposer.prototype.readMoreExpand = function() {
        var self = this,
        $content = self.$el.find('.testimonials__content');
       
        $content.each(function () {
            self.breakHtmlContent($(this));
        });

        if(self.options.readMore && self.options.action == 'lightbox'){
            this.$el.find(".lightbox").fancybox({
                'titlePosition' : 'inside',
                'transitionIn'  : 'none',
                'transitionOut' : 'none'
            });
        }

        if(self.options.readMore && self.options.action == 'expand'){
            this.$el.find(".expand").click(function(){                
                var hrefId = $(this).attr('id');
                var spanId = hrefId.replace('href_', 'span_');
                var fsId   = hrefId.replace('href_', 'fs_');

                var $jSpan = $('.' + spanId);
                var $fs    = $('.' + fsId);
                
                var $bxCloneItem = $('.' + spanId).closest('.bx-clone'),
                    $bxCloneAnchor = $bxCloneItem.find("#" + hrefId);

                if ($jSpan.hasClass('hidden')) {
                    $(this).add($bxCloneAnchor).html('Show Less').removeClass('closed').addClass('opened');
                    $jSpan.removeClass('hidden');
                    $fs.hide();
                } else {
                    $(this).add($bxCloneAnchor).html('Show More').removeClass('opened').addClass('closed');
                    $jSpan.addClass('hidden');
                    $fs.show();
                }
            });
        }
    }

    TestimonialsComposer.prototype.breakHtmlContent = function (el) {

        var $content = el;

        // Don't reformat if content has an iframe
        if ($content.find('iframe').length > 0) {
            return;
        }

        // parse the html content to string and create array of htmlTags and innerText, declare/init and get/set global vars
        var contentHtmlStr = $content.html().trim().replace(/&nbsp;/gi, ' '), newContentHtmlStr,
            regExp = /<(?:.|\n)*?>/gm, regResult,
            contentTagsArr = contentHtmlStr.match(regExp),
            contentCharLimit = this.options.readMoreLimit, contentCharCount = 0,
            quotationMark = '<span class="quotemark">"</span>',
            tagStartPositionArr = [], tagEndPositionArr = [], contentHtmlArr = [];
            
            
        // create array of all tag's start position value
        while (regResult = regExp.exec(contentHtmlStr)) {
            tagStartPositionArr.push(regResult.index);
        }
        
        if(!$.isEmptyObject(contentTagsArr)) {
            // create array of all tag's end position value
            for (var i = 0; i < contentTagsArr.length; i++) {
                tagEndPositionArr.push(tagStartPositionArr[i] + contentTagsArr[i].length);
            }
            // create array of htmlTags and innerText in order
            for (var i = 0; i < contentTagsArr.length; i++) {
                contentHtmlArr.push(contentTagsArr[i], contentHtmlStr.substring(tagEndPositionArr[i], tagStartPositionArr[i + 1]));
            }
        }

        // add break point comment if match is different than html tag depending of the character limit settting
        if(this.options.readMore){
            for (var i = 0; i < contentHtmlArr.length; i++) {
                if (contentHtmlArr[i].match(regExp) == null) {
                    var itemLength = contentHtmlArr[i].length;
                    if (contentCharCount + itemLength >= contentCharLimit) {
                        var breakHtmlPosition = contentCharLimit - contentCharCount;
                        contentHtmlArr[i] = contentHtmlArr[i].substring(0, breakHtmlPosition) + "<span><!--breakPoint--></span>" + contentHtmlArr[i].substring(breakHtmlPosition, itemLength);
                        break;
                    } else {
                        contentCharCount += itemLength;
                    }
                }
            }
        }

        // add before quotationMark on the first element that contains innerText
        for (var i = 0; i < contentHtmlArr.length; i++) {
            if (contentHtmlArr[i].match(regExp) == null && contentHtmlArr[i].length > 0) {
                contentHtmlArr[i] = quotationMark + contentHtmlArr[i];
                break;
            }else if (contentHtmlArr[i].indexOf("<!--breakPoint-->") !== -1 || contentHtmlArr[i].indexOf('class="quotemark"') !== -1) {
                contentHtmlArr[i] = quotationMark + contentHtmlArr[i];
                break;
            }
        }

        // add after quotationMark on the last element that contains innerText
        for (var i = contentHtmlArr.length - 1; i > 0; i--) {
            if (contentHtmlArr[i].match(regExp) == null && contentHtmlArr[i].length > 0 && contentHtmlArr[i] != '...') {
                contentHtmlArr[i] = contentHtmlArr[i] + quotationMark;
                break;
            }else if (contentHtmlArr[i].indexOf("<!--breakPoint-->") !== -1 || contentHtmlArr[i].indexOf('class="quotemark"') !== -1) {
                contentHtmlArr[i] = contentHtmlArr[i] + quotationMark;
                break;
            }
        }

        // join the modified arry in string 
        newContentHtmlStr = contentHtmlArr.join("")

        // set the modified string as innerHtml to the element
        $content[0].innerHTML = newContentHtmlStr;

        // get the breakPoint comment 
        var commentElem = document.createNodeIterator($content[0], NodeFilter.SHOW_COMMENT, null, true).nextNode();

        // iterate through the dom nodes split and fix the open close tags with all params
        if (commentElem != null) {
            for (var parent = commentElem.parentNode; $content[0] != parent; parent = grandparent) {
                var right = parent.cloneNode(false);
                while (commentElem.nextSibling)
                    right.appendChild(commentElem.nextSibling);
                var grandparent = parent.parentNode;
                grandparent.insertBefore(right, parent.nextSibling);
                grandparent.insertBefore(commentElem, right);
            }
        }

        var contentExpandWrap = $content.find('[class^="span_testimonial"]'), breakHtmlIndex;

        // find the comment node add index position and remove, wrap all Show More content in span_tesimonials_id
        if (this.options.readMore) {
            $content.contents().each(function (index) {
                if ($(this).get(0).nodeName == "#comment") {
                    breakHtmlIndex = index;
                    $(this).remove();
                }
            });
            $content.contents().each(function (index, element) {
                if (index >= breakHtmlIndex) {
                    if ($(element).is('[class^="fs_testimonial"]') == false && $(element).hasClass('quotemark') == false && $(element).is('[class^="span_testimonial"]') == false) {
                        contentExpandWrap.append(element);
                    }
                }
            });
        }

    }

    TestimonialsComposer.prototype.processDeviceColumns = function(){
    	if(this.options.layoutType == 'grid_1' || this.options.layoutType == 'grid_2' || this.options.layoutType == 'grid_3'){
            this.doGrid();
        } else if(this.options.layoutType == 'slider_1' || this.options.layoutType == 'slider_2' || this.options.layoutType == 'slider_3'){
            this.doSlideshow();
        }
    }

    TestimonialsComposer.prototype.doGrid = function(){
        var device = this.getDevice();

        var columns = this.options[device + 'Columns'];
        var prevDeviceColumns = this.prevDevice ? this.options[this.prevDevice + 'Columns'] : 0;

        if(this.prevDevice == device || columns == this.prevDeviceColumns){
            return; 
        } 
            
        this.prevDevice = device;
        
        this.resetGridHTML();
            
        this.$items.each(function(){
            $(this).removeClass(function (index, className) {
                return (className.match (/\btestimonials-grid--columns\S+/g) || []).join(' ');
            });
        });

        this.$items.each(function(){
            $(this).addClass('testimonials-grid--columns-' + columns);
        });

        //show blocks after testimonials grid content is reloaded with the specific columns settings
        this.$gridContainer.removeClass('initialBlockHide');

        var rows = Math.ceil(this.$items.length/columns);

        for(var row = 1; row <= rows; row++){
            var $row = $('<div class="testimonials-row"></div>');

            this.$gridContainer.append($row);

            for(var j = (row - 1) * columns; j < row * columns; j++){
                if(typeof this.$items[j] == "undefined")
                    continue;

                $row.append($(this.$items[j]).clone());
            }
        }
    }

    TestimonialsComposer.prototype.doSlideshow = function(){
        var device = this.getDevice();

        var columns = this.options[device + 'Columns'];
        var prevDeviceColumns = this.prevDevice ? this.options[this.prevDevice + 'Columns'] : 0;

        if(this.options.mode == 'horizontal' && (this.prevDevice == device || columns == this.prevDeviceColumns)){
            return; 
        }

        this.prevDevice = device;

        if(this.Slider != undefined){
            var $lis = $(this.$el.find('.testimonials-slider > li'));

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
                return (className.match (/\btestimonials-grid--columns\S+/g) || []).join(' ');
            });
        });

        this.$items.each(function(){
            $(this).addClass('testimonials-grid--columns-' + columns);
        });

        //show blocks after testimonials slide content is reloaded with the specific columns settings
        this.$sliderContainer.removeClass('initialBlockHide');

        var slides = Math.ceil(this.$items.length/columns);
        
        for(var slide = 1; slide <= slides; slide++){
            var $li = $('<li class="items-container"></li>');
            var $itemsWrapper = $('<div class="testimonials-items-wrap"></div>');

            this.$sliderContainer.append($li);
            $li.append($itemsWrapper);

            for(var j = (slide - 1) * columns; j < slide * columns; j++){
                if(typeof this.$items[j] == "undefined")
                    continue;

                var $itm = $(this.$items[j]);

                $itemsWrapper.append($(this.$items[j]).clone());
            }
        }
        
        window.testimonialSlider = this.Slider = this.$sliderContainer.testimonialSlideshow({ numSlides: slides});

    }

    TestimonialsComposer.prototype.resetGridHTML = function(){
        var self = this;

        self.$gridContainer.html('');
    }

    TestimonialsComposer.prototype.resetSlideshowHTML = function(){
        var self = this;

        self.$sliderContainer.html('');
    }

    TestimonialsComposer.prototype.getDevice = function(){
    	var width = window.innerWidth;

    	if(width < 768)
    		return 'mobile';

    	if(width < 1025)
    		return 'tablet';

    	return 'desktop';
    }

    var old = $.fn.TestimonialsComposer;

    $.fn.testimonialsComposer = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this);

            var options = $.extend({}, $this.data(), typeof option == 'object' && option);
            var data = '';

            $this.data('TestimonialsComposer', (data = new TestimonialsComposer($this, options)));

            if (typeof result != 'undefined') return false;
        });

        return result ? result : this;
    };

    $.fn.testimonialsComposer.Constructor = TestimonialsComposer

    $.fn.testimonialsComposer.noConflict = function () {
        $.fn.testimonialsComposer = old
        return this
    }

    $(window).on('load', function(){
    	$('[data-control="testimonials-composer"]').testimonialsComposer();
    });
}(window.jQuery);