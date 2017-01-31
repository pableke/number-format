
function NumberFormat() {
	const binMask = /[^01]+/g;
	const intMask = /[^0-9e\-]+/gi;
	const hexMask = /[^0-9a-f]/gi;
	const masks = {
		default: { decimals: 2, whole: 3, section: ",", decimal: "." },
		float:   { decimals: 2, whole: 3, section: ",", decimal: "." },
		latin:   { decimals: 2, whole: 3, section: ".", decimal: "," },
		integer: { decimals: 0, whole: 3, section: " ", decimal: "." },
		binary:  { decimals: 0, whole: 4, section: "-", base: 2 },
		hex:     { decimals: 0, whole: 2, section: ".", base: 16 }
	};
	this.masks = masks;

	function lpad(val, len) {
		while (val.length < len)
			val = "0" + val;
		return val;
	};

	/**
	 * toNumber(value, mask)
	 *
	 * @param string value: input to convert
	 * @param string/object mask: input value format
	 */
	this.toNumber = function(value, mask) {
		if (typeof value !== "string") return value;
		var opts = masks[mask] || mask || masks.default;
		if (opts.base == 2)
			return parseInt(value.replace(binMask, ""), 2) >> 0; // to int32
		if (opts.base == 16)
			return parseInt(value.replace(hexMask, ""), 16) >> 0; // to int32
		var i = value.lastIndexOf(opts.decimal);
		var num = value.replace(intMask, "");
		if (i < 0) return parseFloat(num);
		i = num.length - (value.length - i) + 1;
		return parseFloat(num.substr(0, i) + "." + num.substr(i));
	};

	/**
	 * format(value, mask)
	 *
	 * @param integer value: value to format
	 * @param string/object mask: format to apply
	 */
	this.format = function(value, mask) {
		if (isNaN(value)) return value; // return as it is.
		var opts = masks[mask] || mask || masks.default;
		opts.whole = opts.whole || 3; //default = 3
		opts.base = opts.base || 10; //default = 10
		var sign, whole, decimal; //number parts
		sign = whole = decimal = "";
		if (opts.base != 10) {
			value = (value >>> 0).toString(opts.base);
			whole = lpad(value, Math.ceil(value.length / opts.whole) * opts.whole);
		}
		else {
			var parts = value.toString().split(".");
			whole = parts.shift(); //whole part
			decimal = parts.shift() || ""; //decimal part
			decimal += "000000000000000000000000000";
			decimal = (opts.decimal && opts.decimals)
					? (opts.decimal + decimal.substr(0, opts.decimals))
					: "";
			sign = (whole.charAt(0) == "-") ? "-" : sign;
			if ((whole.charAt(0) == "-") || (whole.charAt(0) == "+"))
				whole = whole.substr(1);
		}
		var result = []; //parts container
		var i = whole.length % opts.whole;
		i && result.push(whole.substr(0, i));
		while (i < whole.length) {
			result.push(whole.substr(i, opts.whole));
			i += opts.whole;
		}
		return sign + result.join(opts.section) + decimal;
	};

	/**
	 * trNumber(value, mask, dest)
	 *
	 * @param string value: value to format
	 * @param string/object mask: format to apply
	 * @param string/object dest: destination mask
	 */
	this.trNumber = function(value, mask, dest) {
		return this.format(this.toNumber(value, mask), dest || mask);
	};
};
