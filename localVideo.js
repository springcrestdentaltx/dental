+ function ($) {
    "use strict";
    $(window).load(function () {
        var checkExist = setInterval(function () {
            var videoElem = $('#vid_local');
            if (videoElem.length) {
                var video = videoElem[0];
                if (autoPlay) videoElem.attr('autoplay', true);
                if (video.paused && autoPlay) video.play();
                clearInterval(checkExist);
            }
        }, 100);
    });
}(window.jQuery);