/**
 * The Simple Tabs Plugin
 *
 * $('#tabs > a').simpleTabs({
 *     contents:'#tabContents > div.content', //required
 *     onBeforeSwitch: function(content, index, tabs, contents) {},
 *     onSwitch: function(content, index, tabs, contents) {}
 * });
 *
 * @param {Object} options
 */
$.fn.simpleTabs = function (options) {
	var settings = {
		contents: "",
		currentClass: "current",
		defaultShow: 1,
		event: "click",
		method: {},
		onBeforeSwitch: $.noop,
		onSwitch: $.noop
	};
	if (options) {
		$.extend(settings, options);
	}

	var tabs = $(this);
	var contents = $(settings.contents);
	tabs.eq(settings.defaultShow).addClass(settings.currentClass);
	contents.hide().eq(settings.defaultShow).show();

	settings.method.switchTab = function (index) {
		var t = tabs.eq(index), c = contents.eq(index);

		settings.onBeforeSwitch.call(c, index, tabs, contents);

		tabs.not(t).removeClass(settings.currentClass);
		t.addClass(settings.currentClass);
		contents.not(c).hide();
		c.show();

		settings.onSwitch.call(c, index, tabs, contents);
	};

	tabs.bind(settings.event, function () {
		var index = tabs.index(this);
		settings.method.switchTab(index);
	});

	return this;
};

