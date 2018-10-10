/**
 * Lazyload
 *
 * $('img').lazyload();
 * $('#scrollContainer img').lazyload('#scrollContainer');
 */
(function($) {

	function getContainerWindow(container) {
		var w = $(container);
		return {
			height: w.height(),
			top: w.get(0) === window ? w.scrollTop() : w.offset().top
		};
	}

	function visibility(win, o) {
		var post = o.offset().top - win.top;
		var posb = post + o.height();
		return (o.is(':visible') && (post >= 0 && post < win.height) || (posb > 0 && posb <= win.height));
	}

	$.fn.lazyload = function(container) {
		if (this.length == 0) return;

		//Cached
		var cache = [];
		this.each(function() {
			if ($(this).data('lazyload') || $(this).hasClass('lazyload-loaded')) return;

			cache.push(this);

			if (this.tagName.toLowerCase() == "img" && !$(this).attr("src")) {
				$(this).attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAOjo6AAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==");
			}

			$(this).data('lazyload', true);
		});

		if (cache.length == 0) return;
		if (!container) container = window;

		function check() {
			var win = getContainerWindow(container);

			for (var i=0,obj; obj=cache[i]; i++) {
				var o = $(obj);
				if (visibility(win, o)) {
					cache.splice(i, 1);
					i--;
					if (!o.hasClass('lazyload-loaded')) {
						o.attr("src", o.data('src')).addClass('lazyload-loaded').removeAttr("data-src");
					}
					o.removeData('lazyload');
				} else if (!document.body.contains(obj)) {
					cache.splice(i, 1);
					i--;
				}
			}

			if (cache.length == 0) {
				$(container).off('scroll', check);
			}
		}

		$(container).on('scroll', check);
		check();

		return this;
	};

})(jQuery);