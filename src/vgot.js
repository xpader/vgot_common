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

	/**
	 * 并联加载指定的脚本
	 *
	 * 并联加载[同步]同时加载，不管上个是否加载完成，直接加载全部
	 * 全部加载完成后执行回调
	 *
	 * @param {Array|string} scripts 指定的脚本们
	 * @param {Function} callback 成功后回调的函数
	 * @return array 所有生成的脚本元素对象数组
	 */
	common.loadScript = function(scripts, callback) {
		if(typeof(scripts) != "object") var scripts = [scripts];
		var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement, s = new Array(), loaded = 0;
		for(var i=0; i<scripts.length; i++) {
			s[i] = document.createElement("script");
			s[i].setAttribute("type","text/javascript");
			s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
				if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
					loaded++;
					this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
					if(loaded == scripts.length && typeof(callback) == "function") callback();
				}
			};
			s[i].setAttribute("src",scripts[i]);
			HEAD.appendChild(s[i]);
		}
	}

	/**
	 * 发起一个JSONP请求
	 *
	 * @param {string} url
	 * @param {Function} callback 请求成功时执行些回调，数据将原样传给此回调
	 */
	common.jsonp = function(url, callback) {
		var func = "callback" + Math.random().toString().substr(2), script;
		url += ((url.indexOf("?") == -1) ? "?" : "&") + "callback=" + func;

		window[func] = function (ret) {
			callback(ret);
			document.body.removeChild(script);
			script = null;
			delete window[callback];
		};

		script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		document.body.appendChild(script);
		script.setAttribute("src", url);
	}

})(window.vgot);