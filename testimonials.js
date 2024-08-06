$(window).load(function () {

    var $flexSlider = $('.testimonials .flexslider'),
        $sliderUl = $('.testimonials-slider'),
        $msnryContainer = $('.testimonials-grid-a .testimonial-grid');

    function triggerScroll() { setTimeout(function () { $(window).trigger("scroll"); }, 600); }

    if ($flexSlider.length) {

        $flexSlider.flexslider({
            animation: "slide",
            slideshowSpeed: 5000,
            animationDuration: 700,
            // smoothHeight: true,
            controlNav: true,
            directionNav: false,
            allowOneSlide: true,
            before: function () {
                if (lazyLoadImg) triggerScroll();
            },
        });

        $sliderUl.off('click').on('click', '.expand', function (event) {
            $flexSlider.resize();
        });
    }

    if ($msnryContainer.length) {

        $msnryContainer.masonry({
            itemSelector: '.testimonial-grid__item',
            gutter: 30,
            transitionDuration: '0.2s'
        });

        $msnryContainer.off('click').on('click', '.expand', function () {
            $msnryContainer.masonry();
        });
    }

    var lazyLoadImg = false;
    $('.lazyLoadImg').length ? lazyLoadImg = true : lazyLoadImg = false;

    if (lazyLoadImg) {
        $('.testimonials .lazy').lazy({
            effect: "fadeIn",
            effectTime: 2000,
            threshold: 0,
            onFinishedAll: function() {
                setTimeout(function () { $msnryContainer.masonry(); }, 100);
            }
        });
    }

});