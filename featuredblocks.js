+function ($) {
    "use strict";

    $(document).ready(function() {
        $( ".fbF_ShowMoreLess" ).click(function() {
            $( this ).fadeOut(0).toggleClass("showMore").fadeIn(800);
            $( this ).parent().find('.featuredblock.row').toggleClass("showMore");
        });

        // #SMBWMGR-13529 WYSIWYG editor for the non-PLE themes fix
        $('.featuredblock__description.nonPle p').addClass('featuredblock__description');
    });

    $(window).load(function () { 
              
        flyupToggle($('.featuredblocks-flyup-a'));
        flyupToggle($('.featuredblocks-flyup-b'));
        flyupToggle($('.featuredblocks-flyup-c'));

    });

    function flyupToggle(fb) {
        fb.each(function(){
            var items = $(this).find('.expander');

            items.each(function(){
                $(this).click(function (){
                    if($(this).attr('aria-expanded') == 'true') {
                        $(this).attr('aria-expanded','false')
                    }
                    else {
                        $(this).attr('aria-expanded','true')
                    }
                    $(this).closest('.featuredblock__wrap').find('ul').slideToggle();
                });
            });
        });
    };


}(window.jQuery);