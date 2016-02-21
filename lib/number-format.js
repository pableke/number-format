'use strict';

var _self = this; //auto-reference module

exports.masks = {
	"default": "#,##0.00",
	"float":   "#,##0.00",
	"integer": "# ##0.##",
	"binary":  "bbbb-bbbb",
	"hex":     "hh-hh"
};

exports.toNumber = function(value, mask) {
	if (!isNaN(value)) return value;
	mask = _self.masks[mask] || mask || _self.masks["default"];

	if (mask.startsWith("bb"))
		return parseInt(value.match(/[01]+/g).join(""), 2);
	if (mask.startsWith("hh"))
		return parseInt(value.match(/[\da-fA-F]+/g).join(""), 16);
	var parts = value.match(/\d+/g);
	var num = parts[0]; //container
	var n = parts.length - 1;
	if (n < 1) return +num;
	for (var i = 1; i < n; i++)
		num += parts[i];
	num += "." + parts[n];
	return parseInt(num);
};

function lpad(val, len) {
	len = len || 2;
	while (val.length < len) {
		val = "0" + val;
	}
	return val;
};

function chunk(str, size) {
	var numChunks = Math.ceil(str.length / size);
	str = lpad(str, numChunks * size);
	var chunks = new Array(numChunks);
	for (var i = 0; i < numChunks; ++i) {
		chunks[i] = str.substr(i * size, size);
	}
	return chunks;
}

/**
 * _format(n, x, s, c)
 *
 * @param integer v: value to format
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
var _format = function(v, n, x, s, c) {
	var num = v.toFixed(Math.max(0, ~~n));
	var re = new RegExp("\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")", "g");
	return (c ? num.replace(".", c) : num).replace(re, "$&" + (s || ","));
};

/**
 * format(value, mask)
 *
 * @param integer value: value to format
 * @param string  mask: format to apply
 */
exports.format = function(value, mask) {
	if (isNaN(+value)) return value; // return as it is.
	mask = _self.masks[mask] || mask || _self.masks["default"];

	var parts = mask.split(/([^\d#bh])/g);
	var size = parts.length;
	var n = parts[size - 1] ? parts[size - 1].replace(/#/g, "").length : 0;
	var x = (size > 2) ? parts[size - 3].length : 3;
	if (mask.startsWith("bb"))
		return chunk((~~value).toString(2), x).join(parts[size - 2]);
	if (mask.startsWith("hh"))
		return chunk((~~value).toString(16), x).join(parts[size - 2]);
	return _format(value, n, x, parts[size - 4], parts[size - 2]);
};
