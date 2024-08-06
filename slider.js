+function ($) { "use strict";
	var Slider = function(element, options) {
        var self = this;

        this.$element         = $(element);
        this.$ul              = this.$element;
        this.$videos          = $('.video-js-slider', element);
        this.$videoOverlays   = $('.video-overlay', this.$element);
        this.players          = [];
        this.clones           = [];
        this.prevDevice       = null;
        this.loaded           = 0;
        this.tempArrVidsPause = [];
        this.vidsPauseClicked = [];
        this.lastDevice       = '';
        this.hadInteraction   = false;
        this.firstPlayerRef   = null;

        window.addEventListener('wm-defer-js', () => {
            self.hadInteraction = true;
            if (self.firstPlayerRef && self.firstPlayerRef.paused()) {
                // It have to be muted, because chrome, firefox policies
                self.$element.stopAuto();
                self.firstPlayerRef.muted(true);
                self.firstPlayerRef.play();
                self.firstPlayerRef = null;
            }
        });

        this.groupSlidesByDevice();

        this.options = this.parseTrueFalseOptions(options);

        this.auto = this.options.auto;
        //this.options.auto = false;

        this.muted = false;
        // Always on autoplayvideo videos should be muted because the browsers do not allow autoplay on videos with sound.
        if(this.options.autoplayvideo){
            this.muted = true;
        }

        // SMBWMGR-3196 URL param to load the slide show component in a paused state
        // @deprecated slide_show_pause
        this.startPaused = (location.href.indexOf("slide_show_pause=1") !== -1) ||
                           (location.href.indexOf("screenshot_mode=1")  !== -1);
        if(this.startPaused) {
            this.options.auto = false;
        }

        // We have to shut off auto, because maybe the slider will go to orher slide while video is loading ...
        if(this.options.auto && this.options.firstSlideVideo && this.options.autoplayvideo){
            this.change = true;
            this.options.auto = false;
        }

        self.attachEvents();

        self.runSlider();
    }

    Slider.prototype.runSlider = function() {
        var self = this;
        var device = self.getDevice();
        var objString;
        var bxSliderData;

        if(self.lastDevice != '') {
            if(device == self.lastDevice){
                return
            }

            if(JSON.stringify(self[device + 'Items']) == JSON.stringify(self[self.lastDevice + 'Items'])) {
                self.lastDevice = device;
                return
            }
        }

        self.lastDevice = device;

        // destroy slider
        self.destroySlider();

        objString = device + 'Items';

        self.options.count = self[objString].length;

        if(self.options.count == 0)
            return

        self[objString].forEach(function(item){
            self.$ul.append(item);
        });

        if(self.options.count == 1) {
            self.options.infiniteLoop = false;
        }

        bxSliderData = self.generateBxSliderData();
        $.extend(bxSliderData, self.options);
        self.$bxSlider = self.$ul.bxSlider(bxSliderData);
    }

    Slider.prototype.generateBxSliderData = function(){
        var self = this;

        return {
            onSlideAfter: function($slideElement, oldIndex, newIndex) {
                //stop all videos
                self.players.forEach(function(player){
                    if(!player.paused()){
                        if(self.tempArrVidsPause.indexOf(player.id_) == -1){
                            self.tempArrVidsPause.push(player.id_);
                        }

                        player.pause();
                    }
                });


                if($slideElement.hasClass('slider__video_type')){
                    var itemId = $slideElement.find('[data-item-id]').data('itemId');
                    var player = self.findPlayerByItemId(itemId);

                    if(!player)
                        player = self.returnPlayer($slideElement.find('.video-js'));

                    if(self.options.autoplayvideo && (player.currentTime() < 1)){
                        // It have to be muted, because chrome, firefox policies
                        self.$element.stopAuto();
                        if (self.hadInteraction) {
                            player.muted(true);
                            player.play();
                        } else {
                            self.firstPlayerRef = player;
                        }
                    }

                    if(self.muted){
                        player.muted(true);
                    }
                }

                if(self.options.stopSlideshowAfterOneLoop && (self.options.count - 1 == newIndex)){
                    self.$element.stopAuto();
                }
            },
            onSliderLoad: function (currentIndex) {
                self.$element.css("visibility", "visible");
                self.$wrapper = self.$element.closest('.bx-wrapper');

                if(self.options.easing == '')
                    self.options.easing = null;

                if(self.options.controlsHover){
                    $(".bx-controls-direction", self.$wrapper).hide();

                    self.$wrapper.hover(
                        function () { $(".bx-controls-direction", $(this)).fadeIn(300); },
                        function () { $(".bx-controls-direction", $(this)).fadeOut(300); }
                    );
                }

                if(self.options.autoHoverModified){
                    self.$wrapper.hover(
                        function(){
                            if(self.options.auto){
                                self.$element.stopAuto();
                            }
                        },
                        function(){
                            if(self.options.auto){
                                if(!self.isVideoPlaying()){
                                    self.$element.stopAuto();
                                    self.$element.startAuto();
                                }
                            }
                        }
                    );
                }

                if(self.change){
                    self.options.auto = true;
                }

                if(self.options.easing != null){
                    self.options.useCSS = false;
                }

                if(self.auto){
                    self.makePauseSlideshowButton();
                }

                // Because of clones
                var index;
                if(self.options.count > 1 &&  self.options.mode != 'fade'){
                    index = 1;
                } else {
                    index = 0;
                }

                var autoPlaySlideShow = function () {
                    self.options.auto = self.auto;

                    if(self.options.auto && !self.startPaused){
                        self.$element.startAuto();
                    }
                };


                var $slideElement = $('#slider').find('.bx-viewport').find('ul').children().eq(index);

                if($slideElement.hasClass('slider__video_type')){
                    var player = self.returnPlayer($slideElement.find('.video-js'));
                    if(self.options.autoplayvideo){
                        // It have to be muted, because chrome, firefox policies
                        self.$element.stopAuto();
                        if (self.hadInteraction) {
                            player.muted(true);
                            player.play();
                        } else {
                            self.firstPlayerRef = player;
                        }
                    }
                    if(self.muted){
                        player.muted(true);
                    }
                }

                self.initializeClones();
                self.initializeOverlays();


                // wrap bx-slider buttons controls
                self.$element.closest('.bx-wrapper').find('.bx-controls').wrapAll("<div class='wrap__bx-controls' />");
                self.$element.closest('.bx-wrapper').find(".wrap_on-off, .wrap_pause-play, .bx-pager " ).wrapAll( "<div class='bx-controls-buttons' />");
            }
        };
    }

    Slider.prototype.destroySlider = function() {
        var self = this;

        if(self.$bxSlider) {
            self.$bxSlider.destroySlider();
        }

        self.$ul.html('');
    }

    Slider.prototype.attachEvents = function(){
        var self = this;
        var player;

        $('#slider').on('click', '.pause-slideshow', function(e, data){
            $(this).hide();
            self.$element.stopAuto();
            self.options.auto = false;

            $('#slider .play-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });

            if(player = self.isVideoPlaying()){
                player.pause();
            }
        });

        $('#slider').on('click', '.play-slideshow', function(e, data){
            $(this).hide();
            self.$element.startAuto();
            self.options.auto = true;

            $('#slider .pause-slideshow').fadeIn("slow", function(){
                if(typeof data != "undefined"){
                    $(this).focus();
                }
            });
        });

        $('body').keypress(function(e){
            var key = e.which;
            if(key == 13){
                if($('#slider').find('.play-slideshow').is(':focus')){
                    $('#slider').find('.play-slideshow').trigger('click', { kb: true});
                }

                if($('#slider').find('.pause-slideshow').is(':focus')){
                    $('#slider').find('.pause-slideshow').trigger('click', { kb: true});
                }

                if($('#slider').find('.sound-off').is(':focus')){
                    $('#slider').find('.sound-off').trigger('click', { kb: true});
                }

                if($('#slider').find('.sound-on').is(':focus')){
                    $('#slider').find('.sound-on').trigger('click', { kb: true});
                }
            }
        });

        var winResizeTimer;
        $(window).resize(function () {
            clearTimeout(winResizeTimer);
            winResizeTimer = setTimeout(function () {
                self.runSlider();
            }, 250);
        });
    }

    Slider.prototype.returnPlayer = function($video) {
        var me = this;
        var data = $video.data('setupRun');

        if(data.techOrder != undefined && (data.techOrder[0] == 'vimeo')){
            data.controls = false;
        }

        if(data.techOrder != undefined && (data.techOrder[0] == 'youtube')){
            data.youtube = { ytControls: 2 };
            data.controls = false;
        }

        // The reason why the video is paused here, its because some of the videos are autoplayed even when the sliders is not showing them.
        // The autoplaying videos control is on line 112

        var plyr = videojs($video.attr('id'), data, function(){
            var player = this;
            me.players.push(player);

            var clone;
            player.on("play", function(){
                me.showCaptionWhilePlay(this.id_, false);

                if(me.options.auto){
                    me.$element.stopAuto();
                }
            });

            player.on("pause", function(data){
                me.showCaptionWhilePlay(this.id_, true);

                if(me.options.auto){
                    me.$element.stopAuto();
                    me.$element.startAuto();
                }

                if(clone = me.hasClone(player)){
                    clone.poster('');
                    clone.bigPlayButton.hide();
                    clone.currentTime(player.currentTime());
                }
            });

            player.on('ended', function() {
                me.showCaptionWhilePlay(this.id_, true);

                if(me.options.auto){
                    me.$element.stopAuto();
                    me.$element.startAuto();
                }
            });
        });

        return plyr;
    }

    Slider.prototype.parseTrueFalseOptions = function(options, skip){
        for (var key in options) {
          if (options.hasOwnProperty(key) && Slider.BOOLEANS.indexOf(key) != -1) {
            options[key] = !!options[key];
          }
        }

	  	return options;
    }

    Slider.prototype.isVideoPlaying = function(){
        var self = this;
        var playing = false;

        self.players.forEach(function(player){
            if(!player.paused()){
                playing = player;
            }
        });

        return playing;
    }

    Slider.prototype.initializeOverlays = function(){
        var self = this;

        if(self.$videoOverlays.length){
            self.$videoOverlays.on('click', function(){
                var player = self.findPlayerByItemId($(this).data('itemId'));

                if(player.paused()) {
                    player.muted(false);
                    player.play();
                }
                else{
                    player.pause();
                }
            });
        }
    }

    Slider.prototype.findPlayerByItemId = function(itemId){
        var self = this;

        for(var i = 0; i < self.players.length; i++){
            var player = self.players[i];

            if($(player.el_).data('itemId') == itemId){
                return player;
            }
        }

        return false;
    }

    Slider.prototype.groupSlidesByDevice = function() {
        var self = this;

        self.desktopItems = [];
        self.tabletItems  = [];
        self.mobileItems  = [];

        var cl;
        var isIE = navigator.userAgent.indexOf('Trident') > -1 ? true : navigator.userAgent.indexOf('MSIE') > -1 ? true : false;

        self.$ul.find('li').each(function(){
            if (isIE) {
                cl = $(this).clone(true, true);
            }
            else {
                cl = $(this);
            }

             if($(this).data('desktop')){
                self.desktopItems.push(cl);
             }

            if($(this).data('tablet')){
                self.tabletItems.push(cl);
            }

            if($(this).data('mobile')){
                self.mobileItems.push(cl);
            }
         });

    }

    Slider.prototype.makePauseSlideshowButton = function(){
        var self = this;

        var stylePlay  = "";
        var stylePause = "";

        if(self.options.auto){
            stylePlay  = 'style="display:none"';
        } else {
            stylePause = 'style="display:none"';
        }

        var htmlPauseSlideshow =   '<div class="wrap_pause-play">'+
                                        '<div class="pause-slideshow" aria-label="icon pause" ' + stylePause + ' title="Pause slideshow" tabindex="0">'+
                                            '<span class="icon icon-pause"></span>'+
                                        '</div>'+
                                        '<div class="play-slideshow" aria-label="icon play" ' + stylePlay + ' title="Play slideshow" tabindex="0">'+
                                            '<span class="icon icon-play"></span>'+
                                        '</div>'+
                                    '</div>';

        $('#slider').find('.bx-wrapper .bx-controls').prepend(htmlPauseSlideshow);
    };

    Slider.prototype.initializeClones = function(){
        var me = this;
        var $clones = me.$element.find('.bx-clone');
        var $videoElement;

        $clones.each(function(index){
            var $clone = $(this);
            $videoElement = $clone.find('video');

            $videoElement.attr('id', $videoElement.attr('id') + '_clone');

            if($videoElement.length){
                var playerData = $($videoElement[0]).data('setupRun') ? $($videoElement[0]).data('setupRun') : $($videoElement[0]).data('setup');

                if(playerData.techOrder != undefined && (playerData.techOrder[0] == 'vimeo')){
                    playerData.controls = false;
                }

                if(playerData.techOrder != undefined && (playerData.techOrder[0] == 'youtube')){
                    playerData.youtube = { ytControls: 2 };
                    playerData.controls = false;
                }

                videojs($videoElement[0], playerData, function(){
                    this.muted(true);
                    me.clones.push(this);
                });
            }
        });
    }

    Slider.prototype.hasClone = function(player){
        var me = this;
        var clonePlayer = false;

        for(var i = 0; i < me.clones.length; i++){
            var obj = me.clones[i];

            if($(obj.el_).attr('id') == $(player.el_).attr('id') + '_clone'){
                return obj
            }
        };

        return false;
    }

    Slider.prototype.showCaptionWhilePlay = function(videoid,show){
        var self = this,
            $vidTextContainer = $('#'+videoid).parents('.slider__item').find("[data-vidplay]"),
            titleoption = $vidTextContainer.data('vidplay');

            show ? titleoption = 1 : titleoption ;
            self.$element.find($vidTextContainer).css({'opacity': titleoption});
    }

    Slider.prototype.getDevice = function(){
        var width = window.innerWidth;

        if (width < 768)
            return 'mobile';

        if (width < 1025)
            return 'tablet';

        return 'desktop';
    }

    Slider.DEFAULTS = {
        video: true,
    	pager: true,
    	controls: true,
    	autoControls: false,
        autoHoverModified: false,
        autoHover: false,
        auto: true,
        infiniteLoop: true,
        randomStart: false,
        controlsHover: false,
        responsive: false,
        mode: 'horizontal',
        speed: 500,
        pause: 4000,
        autoDelay: 0,
        easing: null,
        useCSS: false,
        isEditor: false
    }

    Slider.BOOLEANS = [
        'pager',
        'controls',
        'autoControls',
        'auto',
        'infiniteLoop',
        'randomStart',
        'controlsHover',
        'responsive',
        'autoHoverModified'
    ]

    var old = $.fn.Slider;

    $.fn.Slider = function(option) {
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this);

            var options = $.extend({}, Slider.DEFAULTS, $this.data(), typeof option == 'object' && option);
            var data = '';

            $this.data('bxslider', (data = new Slider(this, options)));

            if (typeof result != 'undefined') return false;
        });

        return result ? result : this;
    };

    $.fn.Slider.Constructor = Slider

    $.fn.Slider.noConflict = function () {
        $.fn.Slider = old
        return this
    }

    $(function(){
    	$('[data-control="slider"]').Slider();
    });
}(window.jQuery);