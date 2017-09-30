/**
 * Created by pader on 2017/9/30.
 */
window.vgot = {};

(function(common) {

	/**
	 * 使用类名查找元素
	 *
	 * @param {string} className
	 * @param {string} tagName
	 * @param {Node} [root]
	 * @returns {Array}
	 */
	common.getElementsByClassName = function(className, tagName, root) {
		if (!tagName) {
			tagName = "*";
		}

		if (!root) {
			root = document;
		}

		var elements = root.getElementsByTagName(tagName);
		var matchElements = [];

		for (var i=0,el; el=elements[i]; i++) {
			if (el.className && el.className.split(" ").indexOf(className) != -1) {
				matchElements.push(el);
			}
		}

		return matchElements;
	};

})(window.vgot);