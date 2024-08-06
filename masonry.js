+function ($) { "use strict";
    var Masonry = function (element, options) {
        this.$el = $(element);
        this.options = options;

        this.init();
    };

    /*
        Masonry initilization
     */
    Masonry.prototype.init = function(){
        var $masonry = this.$el.masonry(this.options);

        // layout Masonry after each image loads
        $masonry.imagesLoaded().progress( function() {
          $masonry.masonry('layout');
        });
    }

    Masonry.DEFAULTS = {
        itemSelector: '.grid-item',
        percentPosition: true
    }

    var old = $.fn.masonryFunction;

    $.fn.masonryFunction = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var result = undefined;

        this.each(function(){
            var $this   = $(this)
            var options = $.extend({}, Masonry.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var data = new Masonry(this, options)
            if (typeof option == 'string') result = data[option].apply(data, args)
            if (typeof result != 'undefined') return false
        });
        
        return result ? result : this;
    }

    $.fn.masonryFunction.Constructor = Masonry

    $.fn.masonryFunction.noConflict = function () {
        $.fn.masonryFunction = old
        return this
    }
}(window.jQuery);