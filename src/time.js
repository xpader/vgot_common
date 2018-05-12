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
	 * @param {Number} timestamp 秒级时间戳
	 * @return {string}
	 */
	fmtime: function(timestamp) {
		var tl = this.now(true) - timestamp;

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
			var date = new Date(timestamp),
				today = this.mkdate(0, 0, 0).getTime();

			if (timestamp >= today) {
				return this.format('HH:mm', date);
			} else if (timestamp >= today - 86400000) {
				return '昨天 ' + this.format('HH:mm', date);
			} else if (timestamp >= this.mkdate(0, 0, 0, 0, 1).getTime()) {
				return this.format('M月d日 HH:mm', date);
			} else {
				return this.format('yyyy-MM-dd', date);
			}
		}
	},
	formatSeconds: function(seconds) {
		var starr = [];

		var years = Math.floor(seconds / 31536000);
		if (years > 0) {
			starr.push(years + "年");
			seconds -= years * 31536000;
		}

		var months = Math.floor(seconds / 2628000);
		if (years > 0 || months > 0) {
			if (months > 0) {
				starr.push(months + "个月");
			}
			seconds -= months * 2628000;
		}

		var weeks = Math.floor(seconds / 604800);
		if (years > 0 || months > 0 || weeks > 0) {
			if (weeks > 0) {
				starr.push(weeks + "个星期");
			}
			seconds -= weeks * 604800;
		}

		var days = Math.floor(seconds / 86400);
		if (months > 0 || weeks > 0 || days > 0) {
			if (days > 0) {
				starr.push(days + "天");
			}
			seconds -= days * 86400;
		}

		var hours = Math.floor(seconds / 3600);
		if (days > 0 || hours > 0) {
			if (hours > 0) {
				starr.push(hours + "个小时");
			}
			seconds -= hours * 3600;
		}

		var minutes = Math.floor(seconds / 60);
		if (days > 0 || hours > 0 || minutes > 0) {
			if (minutes > 0) {
				starr.push(minutes + "分钟");
			}
			seconds -= minutes * 60;
		}

		if (seconds > 0) {
			starr.push(seconds + "秒");
		}

		return starr.join('，');
	},
	mkdate: function(hour, minute, second, month, date, year) {
		var d = new Date();

		if (!isNaN(hour)) {
			d.setHours(hour);
		}

		if (!isNaN(minute)) {
			d.setMinutes(minute);
		}

		if (!isNaN(second)) {
			d.setSeconds(second);
			d.setMilliseconds(0);
		}

		if (!isNaN(month)) {
			d.setMonth(month);
		}

		if (!isNaN(date)) {
			d.setDate(date);
		}

		if (!isNaN(year)) {
			d.setFullYear(year);
		}

		return d;
	}
};