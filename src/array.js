/**
 * Created by pader on 2017/12/07.
 */
/**
 * 从二维数据列表中，找出字段匹配值的行所在位置
 * @param {String} col
 * @param val
 * @returns {number}
 */
Array.prototype.indexOfColumnFirst = function(col, val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i][col] == val) return i;
	}
	return -1;
};

/**
 * 从二维数组列表中，找出字段匹配值的那一行
 * @param {String} col
 * @param val
 * @returns {Array}
 */
Array.prototype.firstRowOfMatchColumn = function(col, val) {
	var i = this.indexOfColumnFirst(col, val);
	return i != -1 ? this[i] : null;
};

/**
 * 从二维数组列表中，找出字段匹配值的所有行，并返回一个数组
 * @param {String} col
 * @param val
 * @returns {Array}
 */
Array.prototype.rowsOfMatchColumn = function(col, val) {
	var arr = [];
	for (var i = 0; i < this.length; i++) {
		if (this[i][col] == val) arr.push(this[i]);
	}
	return arr;
};

/**
 * 移除数组中的匹配值
 * @param val
 */
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};