+function ($) { 
  "use strict";

  // New instance
  $(document).ready(function(){
    var featuredarticlesSelector = ".js-featuredarticles-layout-settings";  
    var featuredarticlesLayoutType = $(featuredarticlesSelector).data("layout-type");

    if(featuredarticlesLayoutType === 'list'){
        sr.reveal('.featuredarticles__item');
    }

    var lazyLoadImg = false;
    $('.lazyLoadImg').length ? lazyLoadImg = true : lazyLoadImg = false;

    if (lazyLoadImg) {
        $('.featuredarticle .lazy').lazy({
            effect: "fadeIn",
            effectTime: 2000,
            threshold: 0
        });
    }

  });

}(window.jQuery);