$('document').ready(function () {

	$('.gallery').on('html_restructured', function () {
		var ratio = $('.gallery').data('ratio');

		$(".gallery [data-setup-run]").each(function () {
			if (ratio == 'square') {
				$(this).height($(this).width());
			} else if (ratio == 'rectangle') {
				$(this).height($(this).width() * 0.75);
			}

			var player = videojs(this, $(this).data('setupRun'));
			if (player) {
				var options = player.options();

				player.on("pause", function () {
					player.bigPlayButton.hide();
					player.posterImage.hide();
				});

				if (options.techOrder[0] == 'vimeo') {
					var $imgContainer = $(player.posterImage.el_),
						$iframe = $(player.el_).find('iframe');

					if ($imgContainer.attr('style') == undefined) $imgContainer.addClass('noVimeoPoster');

					$imgContainer.bind("click touchstart", function () {
						$iframe.addClass('vimeoStarted');
						$imgContainer.removeClass('noVimeoPoster');
						// triggering play on videoJS player instance was not working
						$iframe[0].src += "&muted=1&autoplay=1";
					});
				}
			}
		});

	});
});