/**
 * Created by pader on 2017/9/30.
 */
(function(W) {

	/**
	 * 使用类名查找元素
	 *
	 * @param {string} className
	 * @param {string} tagName
	 * @param {Node} [root]
	 * @returns {Array}
	 */
	W.getElementsByClassName = function(className, tagName, root) {
		if (!tagName) tagName = "*";
		if (!root) root = document;
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
	W.loadScript = function(scripts, callback) {
		if (typeof(scripts) != "object") scripts = [scripts];
		var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement, s = [], loaded = 0;
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
	};

	/**
	 * 发起一个JSONP请求
	 *
	 * @param {string} url
	 * @param {Function} callback 请求成功时执行些回调，数据将原样传给此回调
	 */
	W.jsonp = function(url, callback) {
		var func = "callback" + Math.random().toString().substr(2), script;
		url += ((url.indexOf("?") == -1) ? "?" : "&") + "callback=" + func;

		window[func] = function (ret) {
			document.body.removeChild(script);
			script = null;
			delete window[callback];
			callback(ret);
		};

		script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		document.body.appendChild(script);
		script.setAttribute("src", url);
	};

	/**
	 * @param {string} name
	 * @param {string} value
	 * @param {int} [expire]
	 * @param {string} [path]
	 */
	W.setCookie = function(name, value, expire, path) {
		var exp  = new Date();
		if (expire == undefined) {expire = 0;}
		exp.setTime(exp.getTime() + expire * 1000);
		if (path == undefined) {path = "/";}
		document.cookie = name + "=" + encodeURIComponent(value) + ";path=" + path + ";expires=" + exp.toGMTString();
	};

	/**
	 * @param {string} name
	 * @returns {null|string}
	 */
	W.getCookie = function(name) {
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null) return decodeURIComponent(arr[2]); return null;
	};

	/**
	 * @param {string} name
	 */
	W.delCookie = function(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.get(name);
		if (cval!=null) document.cookie= name + "=" + cval + ";expires=" + exp.toGMTString();
	};

	/**
	 * @param {string} text
	 * @returns {string}
	 */
	W.urlencode = function(text) {
		return text.replace(/:/g,'%3A').replace(/\//g,'%2F').replace(/\./g,'%2E').replace(/\?/g,'%3F').replace(/\=/g,'%3D').replace(/&/g,'%26').replace(/#/g,'%23').replace(/\+/g,'%2B').replace(/ /g,'+');
	};

	/**
	 * @param {string} a
	 * @returns {number}
	 */
	W.dstrlen = function(a) {
		var b = 0;
		for (var i=0; i<a.length; i++) {
			if (a.charCodeAt(i) < 0 || a.charCodeAt(i) > 255) {
				b = b + 2;
			} else {
				b = b + 1;
			}
		}
		return b;
	};

})(window);