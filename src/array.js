/**
 * Created by pader on 2017/12/07.
 */
Array.prototype.indexOfColumnFirst = function(col, val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i][col] == val) return i;
	}
	return -1;
};

Array.prototype.firstRowOfMatchColumn = function(col, val) {
	var i = this.indexOfColumnFirst(col, val);
	return i != -1 ? this[i] : null;
};

Array.prototype.rowsOfMatchColumn = function(col, val) {
	var arr = [];
	for (var i = 0; i < this.length; i++) {
		if (this[i][col] == val) arr.push(this[i]);
	}
	return arr;
};

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};