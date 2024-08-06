$(document).ready(function() {
	$(".preview_iframe").height($(window).height());
	
	$("button.searchbar-a__btnsearch, button.searchbar-a__closeflyoutbtn").click(function(){
    $("div.searchbar-a__flyout").fadeToggle();
  });
	

	var sliderTimer; // timer var for slider's inlineImageParallax func

	// mmenu subnav indication helpers
	var menu = $('#navigation_header'),
		menuParent = menu.parent(),
		menuList = menu.find('ul'),
		subnavClass = 'sublevel-';

	// loop through main navigation, define if there are any sub-levels and wrap into container with corresponding class name
	// the function is needed because mmenu doesn't provide this functionality, and we need it to style sub-levels differently, with their own color schemes
	navigationSublevelWrap(menuList, subnavClass);

	// init mmenu
	menu.clone().attr('id', 'navigation--mobile').mmenu({
		extensions: [
			'multiline',
			'border-none',
			'pagedim-white'
		],
		offCanvas: {
			zposition: 'front'
		}
	});

	// Fix a bug with Chrome/Firefox where HTML5 autoplay videos stop when the DOM
	// around them is manipulated (in theme: by mmenu)
	if($('.fullscreenbackground-video video').length) {
		$('.fullscreenbackground-video video').each(function() {
			if(this.autoplay) return this.play();
		});
	}

	// custom functionality for mmenu
	if($('#navigation--mobile').length) {
		var mmenuCloseBtn = $('<a href="#" class="mm-btn mm-close">'),
			mmenuAPI = $("#navigation--mobile").data( "mmenu" );

		// add close button for mmenu
		$('#navigation--mobile .mm-panels .mm-panel:first-child .mm-navbar').prepend(mmenuCloseBtn);
		// close mmneu on button click
		mmenuCloseBtn.click(function(e) {
			e.preventDefault();
			mmenuAPI.close();
		});
	}
	

	// move hamburger button inside nav container
	$('#hamburger').moveElement({
		place: menuParent
	});

	// hours (incl. locations version) component wrapper fix
	// making similar structure both for hours and locations hours
	$('.hours__list').hoursListWrapper();

	// keep same height for map+hours layout component__title-caption-wrap
	$('.wrap__grid.office-info').sameHeight({
		elements: '.component__title-caption-wrap',
		useMinHeight: true,
		flexible: true,
		multiLine: true
	});

	// add wrapper for featuredblocks__list (needed for styling purposes)
	if(!!$('.featuredblocks__list').length) {
		$('.featuredblocks__list').each(function(){
			$(this).wrapAll('<div class="featuredblocks__list-wrapper" />');
		});
	}

	// keep same height for featureblocks content
	$('.featuredblocks__list').sameHeight({
		elements: '.featuredblock__title',
		useMinHeight: true,
		flexible: true,
		multiLine: true
	});

	$('.featuredblocks__list').sameHeight({
		elements: '.featuredblock__description',
		useMinHeight: true,
		flexible: true,
		multiLine: true
	});

	// init more nav - the rest of init that needs to be updated after switching from tablet/mobile to desktop is below
	// should be called after mmenu init to eliminate MORE nav's structure inheritance by mmenu
	// window.moreButton is called once, on document.ready on plugin init
	// default structure for window.moreButton = $('<li class="navigation__item has-child more"> <a href="#">More</a> <ul class="navigation__list--sub"></ul> </li>'); uncomment if you need to change it
	// WARN: navigation shouldn't be hidden with the usage of display:none, this will break nav init when switching from tablet/mobile to desktop. Please use, e.g. top: -9999px; left: -9999px; instead
	// moreNavResizeUpdate function will be triggered on resize
	// Put functions inside moreNavResizeUpdate that need to be updated on resize
	function moreNavResizeUpdate() {
		window.currentMenuWidth = window.menuHolder.outerWidth();
		// this function will be needed on resize
		addMoreButton();
		// moreNav helper - re-initiate content wrapper for more nav content
		moreNav();

		// prepare desktop nav for accordion
		$('.navigation:not(.mm-menu) .navigation__list>li>div>ul').desktopDropNav();
		// accordion for desktop nav
		$('.navigation:not(.mm-menu)').slideAccordion({
			activeClass: 'open-close--active',
			opener: '>a span.opener',
			slider: '>div.slide',
			animSpeed: 300
		});

		$('.navigation:not(.mm-menu) > ul').dropdownFit({
			dropDown: '>li>div>ul'
		});
		// init main nav drop down max height calculation
		$('.navigation:not(.mm-menu) .sublevel-1').each(function(){
			$(this).scrollArea({
				heightProp: 'maxHeight',
				recalcOnPageScroll: true,
				setScrollTo: '> .navigation__list--sub'
			});
		});
	}

	var staff = $('.wrap__staff'),
		staffItem = staff.find('.staff-member');

	// staff structure helpers
	staffItem.each(function() {
		var item = $(this),
			wrapElems = item.find($('.staff-member__prefix, .staff-member__name, .staff-member__suffix'));

		// wrap repfix and name into common parent holder
		wrapElems.wrapAll('<div class="staff-member__heading" />');
	});

	// handle layout resize
	ResponsiveHelper.addRange({
		'1025..': {
			on: function() {
				if ($('.navigation').not('.mm-menu').data('more-button') === 1) {
					menuPrepare();
					// init more nav
					window.currentMenuWidth = window.menuHolder.outerWidth();
					// this function will be needed on resize
					addMoreButton();
					// moreNav helper - reinitiate content wrapper for more nav content
					moreNav();
					// update moreNav on resize
					$(window).on('resize orientationchange', moreNavResizeUpdate);
				}

				// prepare desktop nav for accordion
				$('.navigation:not(.mm-menu) .navigation__list>li>div>ul').desktopDropNav();
				// accordion for desktop nav
				$('.navigation:not(.mm-menu)').slideAccordion({
					activeClass: 'open-close--active',
					opener: '>a span.opener',
					slider: '>div.slide',
					animSpeed: 300
				});

				$('.navigation:not(.mm-menu) > ul').dropdownFit({
					dropDown: '>li>div>ul'
				});
				// init main nav drop down max height calculation
				$('.navigation:not(.mm-menu) .sublevel-1').each(function(){
					$(this).scrollArea({
						heightProp: 'maxHeight',
						recalcOnPageScroll: true,
						setScrollTo: '> .navigation__list--sub'
					});
				});

				// close mmenu on desktop
				if (typeof $('#navigation--mobile').data('mmenu') !== 'undefined') {
					$('#navigation--mobile').data('mmenu').close();
				}

				// check if form component exists on page
				if ($('.form').length) {
					// this part is initialized on forms load
					$('body').on('SMBLeadsFormReady', function() {
						// init contact form layout
						$('.wrap__form.contact .leadForm, .wrap__form.appointment .leadForm').layoutContactForm();
					});
					// this part is initialized on resolution change
					// init contact form layout
					$('.wrap__form.contact .leadForm, .wrap__form.appointment .leadForm').layoutContactForm();
				}

				// set spacing for inner page header
				
					$('.wrap__fullwidth--inner').setSpacing({
						takeSizeFrom: '.wrap__fullwidth .wrap__header',
						takeSize: 'height',
						spacingProp: 'padding-top',
						flexible: false
					});
				

				// if logo component exists
				// if($('.wrap__fullwidth .wrap__logoHeader .logo').length) {
				// 	// check if logo image is loaded (otherwise the spacing won't be set correctly if image is not loaded yet)
				// 	$('.wrap__fullwidth .wrap__logoHeader .logo__image').each(function(){
				// 		if (!this.complete) {
				// 			$(this).load(function() {
				// 				// handle image load event binding here
				// 				setInnerHeaderSpacing();
				// 			});
				// 		} else {
				// 			// set top spacing for header on fulwidth pages
				// 			setInnerHeaderSpacing();
				// 		}
				// 	});
				// } else {
				// 	setInnerHeaderSpacing();
				// }
				
				// this part will be reinitiated/redestroyed (next init is for 768..1024) to avoid issue with incorrect calculation when header is fixed-on-scroll
				// set position fixed on scroll
				$('body').fixedScrollBlock({
					fixedActiveClass: 'fixed',
					slideBlock: '.wrap__rotate-container--bottom',
					fixedOnlyIfFits: false,
					positionType: 'fixed'
				});
				var header = $('.wrap__header'),
						headerH = $('.wrap__header--bar--top').innerHeight();
				$(window).scroll(function() {
					var windowScroll = $(this).scrollTop(),
							windowWidth = $(this).innerWidth();
					
					if (windowScroll >= headerH) {
						header.addClass('fixed');
					} else {
						header.removeClass('fixed');
					}
				});
				// init scripts only for fullwidth layout
				if($('.wrap__fullwidth .wrap__header').length) {
					// set header to position fixed on scroll in fullwidth layout
					// set spacing for inner page header
					// $('body').fixedScrollBlock({
					// 		fixedActiveClass: 'fixed',
					// 		slideBlock: '.wrap__fullwidth .wrap__header',
					// 		fixedOnlyIfFits: false,
					// 		positionType: 'fixed'
					// 	});
					var setInnerHeaderFixed = function() {
						
					};
					// if logo component exists (otherwise the fixed position won't be set correctly if image is not loaded yet)
					// if($('.wrap__fullwidth .wrap__logoHeader .logo').length) {
					// 	// check if logo image is loaded
					// 	$('.wrap__fullwidth .wrap__logoHeader .logo__image').each(function(){
					// 		if (!this.complete) {
					// 			$(this).load(function(){
					// 				// handle image load event binding here
					// 				setInnerHeaderFixed();
					// 			});
					// 		} else {
					// 			// set top spacing for header on fulwidth pages
					// 			setInnerHeaderFixed();
					// 		}
					// 	});
					// } else {
					// 	setInnerHeaderFixed();
					// }
				}
				
				// init set top position
				$('.map__display').setSpacing({
					takeSizeFrom: '.map .component__title-caption-wrap',
					takeSize: 'height',
					spacingProp: 'top'
				});
			},
			off: function() {
				if ($('.navigation').not('.mm-menu').data('more-button') === 1) {
					// destroy update moreNav on resize
					$(window).off('resize orientationchange', moreNavResizeUpdate);
				}

				// destroy dropdownFit
				$('.navigation:not(.mm-menu) > ul').data('dropdownFit').destroy();
				// destroy main nav drop down max height calculation
				setTimeout(function(){
					$('.navigation:not(.mm-menu) .sublevel-1').each(function(){
						if (typeof $(this).data('scrollArea') !== 'undefined') {
							$(this).data('scrollArea').destroy();
						}
					});
				}, 100);

				// destroy slider parallax
				if (typeof $('.slider__list').data('inlineImageParallax') !== 'undefined') {
					$('.slider__list').data('inlineImageParallax').destroy();
				}

				// destroy layoutContactForm
				$('.wrap__form.contact .leadForm, .wrap__form.appointment .leadForm').each(function() {
					if (typeof $(this).data('layoutContactForm') !== 'undefined') {
						$(this).data('layoutContactForm').destroy();
					}
				});

				if (typeof $('.wrap__fullwidth--inner').data('setSpacing') !== 'undefined') {
					$('.wrap__fullwidth--inner').data('setSpacing').destroy();
				}

				// destroy set position fixed on scroll
				if (typeof $('body').data('FixedScrollBlock') !== 'undefined') {
					$('body').data('FixedScrollBlock').destroy();
				}

				if (typeof $('.map__display').data('setSpacing') !== 'undefined') {
					$('.map__display').data('setSpacing').destroy();
				}
			}
		},
		'..1024': {
			on: function() {
				var logoHeaderTitle = $('.wrap__fullwidth .wrap__logoHeader--inner').clone().addClass('cloned');

				// move header out of wrapper
				$('.wrap__fullwidth .wrap__logoHeader').moveElement({
					place: '.wrap__fullwidth--inner'
				});
				// clone and move logo title
				$('.wrap__fullwidth .wrap__header--bar--top .wrap__additional-components').prepend(logoHeaderTitle);
			},
			off: function() {
				// destroy and move header back to its inital desktop position
				if (typeof $('.wrap__fullwidth .wrap__logoHeader').data('moveElement') !== 'undefined') {
					$('.wrap__fullwidth .wrap__logoHeader').data('moveElement').destroy();
				}
				// destroy cloned and moved logo title
				$('.wrap__logoHeader--inner.cloned').remove();
			}
		},
		'768..1024': {
			on: function() {
				// this part is reinitiated/redestroyed (previous init was for 1025+) to avoid issue with incorrect calculation when header is fixed-on-scroll
				// set position fixed on scroll
				$('body').fixedScrollBlock({
					fixedActiveClass: 'fixed',
					slideBlock: '.wrap__rotate-container--bottom',
					fixedOnlyIfFits: false,
					positionType: 'fixed'
				});

				// init scripts only for fullwidth layout
				if($('.wrap__fullwidth .wrap__header').length) {
					// set header to position fixed on scroll in fullwidth layout
					// set spacing for inner page header
					$('body').fixedScrollBlock({
							fixedActiveClass: 'fixed',
							slideBlock: '.wrap__fullwidth .wrap__header',
							fixedOnlyIfFits: false,
							positionType: 'fixed'
						});
					var setInnerHeaderFixed = function() {
						
					};
					// if logo component exists (otherwise the fixed position won't be set correctly if image is not loaded yet)
					// if($('.wrap__fullwidth .wrap__logoHeader .logo').length) {
					// 	// check if logo image is loaded
					// 	$('.wrap__fullwidth .wrap__logoHeader .logo__image').each(function(){
					// 		if (!this.complete) {
					// 			$(this).load(function(){
					// 				// handle image load event binding here
					// 				setInnerHeaderFixed();
					// 			});
					// 		} else {
					// 			// set top spacing for header on fulwidth pages
					// 			setInnerHeaderFixed();
					// 		}
					// 	});
					// } else {
					// 	setInnerHeaderFixed();
					// }
				}
			},
			off: function() {
				// destroy set position fixed on scroll
				if (typeof $('body').data('FixedScrollBlock') !== 'undefined') {
					$('body').data('FixedScrollBlock').destroy();
				}
			}
		},
		'..767': {
			on: function() {
				// move header out of wrapper
				$('.wrap__home .wrap__logoHeader').moveElement({
					place: '.wrap__rotate-container--inner'
				});
			},
			off: function() {
				// destroy and move header back to its inital desktop position
				if (typeof $('.wrap__home .wrap__logoHeader').data('moveElement') !== 'undefined') {
					$('.wrap__home .wrap__logoHeader').data('moveElement').destroy();
				}
			}
		}
	});
	initSlider();
	initFixHeight('.wrap__slider');
	initCustomScrolls();
});
function initCustomScrolls() {
	var header = $('.wrap__header'),
			headerH = $('.wrap__header--bar--bottom').innerHeight(),
			aboutSection = $('.wrap__fullwidth .wrap__section:not(.gradient):not(.gradient--alt) .wrap__section--inner'),
			aboutSectionPadding = parseInt(aboutSection.css('padding-top'));
	console.log(aboutSectionPadding)
	$(".wrap__page-content .editable a:not([href=\\#top])").click(function(e){
		var GetaName = $(this).attr('href').split('#');
		$('html,body').animate({scrollTop : $('a[name ='+GetaName[1]+']').offset().top - headerH + aboutSectionPadding - 15},1000);
	});
	$(".wrap__page-content .editable a[href='#top']").click(function(e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: headerH }, 800);
	});
}

function initFixHeight(element) {
	var maxHeight = 0,
			slider = $(element);
	slider.css('height','auto');
	slider.find('.slider__item').each(function(){
		var cur = $(this);
		if (cur.height() > maxHeight) {
			maxHeight = cur.height();
		}
	});
	slider.find('.slider__item').css({minHeight: maxHeight});
	slider.find('.bx-viewport').css({height: maxHeight});
}


function initSlider() {
	$('.slider__item').each(function(){
		var cur = $(this),
				curImg = cur.css('background-image').replace(/(url\(|\)|'|")/gi, '');
				curVideo = cur.find('.slider__video');
		if (cur.hasClass('slider__image')) {
			cur.css('background-image', 'none');
			cur.prepend('<div class="slider__image--fixed" style="background-image: url(' + curImg + ')">');
		} else if (cur.hasClass('slider__video_type')) {
			cur.prepend(curVideo);
		}
	});
	var slider = $('.wrap__slider .slider__list[data-mode="vertical"]'),
			sliderTop = parseInt(slider.css('top')),
			sliderItem = $('.wrap__slider .slider__list .slider__item');
	sliderItem.css({
		'top': sliderTop * -1
	});
	$('.slider__text').each(function() {
		if(!$(this).children().length) {
			$(this).addClass('empty');
		}
	});
}