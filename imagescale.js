+function ($) { "use strict";
    var ImageScale = function (element, options) {
        this.$el = $(element);
        this.options = options;

        this.init();
    };

    /*
        ImageScale initilization
     */
    ImageScale.prototype.init = function(){
        var self = this;

        self.$el.find("img.scale").imageScale({
            parent: $('.img-holder-container')
        });

        self.$el.find("img.scale").imageScale({
            parent: $('.img-holder-container')
        });
    }

    ImageScale.DEFAULTS = {
        nextEffect: 'fade',
        prevEffect: 'fade',
        type: 'iframe'
    }

    var old = $.fn.imgScale;

    $.fn.imgScale = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var result = undefined;

        this.each(function(){
            var $this   = $(this)
            var options = $.extend({}, ImageScale.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var data = new ImageScale(this, options)
            if (typeof option == 'string') result = data[option].apply(data, args)
            if (typeof result != 'undefined') return false
        });
        
        return result ? result : this;
    }

    $.fn.imgScale.Constructor = ImageScale

    $.fn.imgScale.noConflict = function () {
        $.fn.imgScale = old
        return this
    }
}(window.jQuery);