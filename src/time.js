/**
 * 时间相关处理函数
 */
module.exports = {
	/**
	 * 获取与客户端当前时间秒数
	 *
	 * @param {boolean} [micro] 是否返回精确到毫秒的时间，默认为false
	 * @return {Number}
	 */
	now: function(micro) {
		micro = micro || false;
		var time = (new Date()).getTime();
		return micro ? time : parseInt(time / 1000);
	},
	/**
	 * 获取与服务器同步的当前时间 Date 对象
	 *
	 * @param {Number} [timestamp]
	 * @return {Date}
	 */
	date: function(timestamp) {
		var ms = timestamp ? timestamp * 1000 : this.now(true);
		return new Date(ms);
	},
	/**
	 * 获取格式化的时间
	 *
	 * @param {string} fmt 格式字符串,可使用: y年, M月, d日, H时, m分, s秒, q季度, S毫秒
	 * <p>示例: yyyy-MM-dd HH:mm:ss</p>
	 * @param {Date} [date] 可选的指定 Date 对象，不指定时默认当前时间
	 * @return {string}
	 */
	format: function(fmt, date) {
		date = date || this.date();

		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"H+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	/**
	 * 更可理解化的时间戳格式化
	 * @param {Number} timestamp 精确到毫秒的时间戳
	 * @return {string}
	 */
	fmtime: function(timestamp) {
		var tl = this.now() - timestamp;

		if (tl < 60) {
			return '刚刚';
		} else if (tl < 1800) {
			return Math.ceil(tl / 60) + '分钟前';
		} else if (tl < 2700) {
			return '半小时前';
		} else if (tl < 3600) {
			return Math.ceil(tl / 60) + '分钟前';
		} else {
			timestamp *= 1000;
			var date = new Date(timestamp);

			if (timestamp > (new Date()).setHours(0, 0, 0, 0)) {
				return '今天 ' + this.format('HH:mm', date);
			} else if (timestamp >= (new Date()).setHours(0, 0, 0, 0)-86400000) {
				return '昨天 ' + this.format('HH:mm', date);
			} else if (timestamp >= (new Date()).setMonth(0, 1).setHours(0, 0, 0, 0)) {
				return this.format('M月d日 HH:mm', date);
			} else {
				return this.format('yyyy-MM-dd', date);
			}
		}
	}
};