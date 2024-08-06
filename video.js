+function ($) {
    "use strict";

    // New instance
    $(document).ready(function () {
        var $youtubevidMedia = $('.youtubevid-item__media');
        var autoplayStr = '&autoplay=1';

        $youtubevidMedia.each(function() {
            var $imgContainer = $playIcon = $(this).find('.youtubevid-item__thumbnail'),
                $playIcon = $(this).find('.icon');

            var $iframe = $(this).find('iframe');

            $playIcon.click(function(e) {
                $imgContainer.fadeOut(2000).add().toggleClass('clicked');
                $iframe[0].src += "&autoplay=1";
                
            });
        });
    });

}(window.jQuery);