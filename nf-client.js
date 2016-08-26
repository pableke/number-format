
function NumberFormat() {
	var _self = this; //auto-reference
	this.masks = {
		"default": { decimals: 2, whole: 3, section: ",", decimal: "." },
		"float":   { decimals: 2, whole: 3, section: ",", decimal: "." },
		"latin":   { decimals: 2, whole: 3, section: ".", decimal: "," },
		"integer": { decimals: 0, whole: 3, section: " ", decimal: "." },
		"binary":  { decimals: 0, whole: 4, section: "-", base: 2 },
		"hex":     { decimals: 0, whole: 2, section: ".", base: 16 }
	};

	function lpad(val, len) {
		for (len = len || 2; val.length < len; )
			val = "0" + val;
		return val;
	};

	function chunk(str, size) {
		var parts = Math.ceil(str.length / size);
		return lpad(str, parts * size);
	};

	/**
	 * _format(n, x, s, c, b)
	 *
	 * @param integer v: value to format
	 * @param integer n: length of decimal part (default 0)
	 * @param integer x: length of whole part (default 3)
	 * @param mixed   s: sections delimiter (default ,)
	 * @param mixed   c: decimal delimiter (default .)
	 * @param integer b: number base format (default base 10)
	*/
	var _format = function(v, n, x, s, c, b) {
		v = v || 0;
		x = x || 3;
		n = b ? 0 : ~~n;
		var num = b ? chunk((~~v).toString(b), x) : v.toFixed(Math.max(0, n));
		var re = new RegExp("\\d(?=(\\d{" + x + "})+" + (n > 0 ? "\\D" : "$") + ")", "g");
		return (c ? num.replace(".", c) : num).replace(re, "$&" + (s || ","));
	};

	/**
	 * _number(v, s, c)
	 *
	 * @param string  v: value to format
	 * @param mixed   s: sections delimiter
	 * @param mixed   c: decimal delimiter
	 * @param integer b: number base format (default base 10)
	 */
	var _number = function(v, s, c, b) {
		if (typeof v != "string")
			return v;
		var reWholePart = new RegExp("[\\s" + s + "]+", "g");
		var num = (b && (b != 10))
					? parseInt(v.replace(reWholePart, "").replace(c, ""), b)
					: parseFloat(v.replace(reWholePart, "").replace(c, "."));
		return isNaN(num) ? parseFloat(v) : num;
	};

	/**
	 * toNumber(value, mask)
	 *
	 * @param string value: input to convert
	 * @param string  mask: input value format
	 */
	this.toNumber = function(value, mask) {
		var opts = _self.masks[mask] || mask || _self.masks["default"];
		return _number(value, opts.section, opts.decimal, opts.base);
	};

	/**
	 * format(value, mask)
	 *
	 * @param integer value: value to format
	 * @param string  mask: format to apply
	 */
	this.format = function(value, mask) {
		if (isNaN(+value))
			return value; // return as it is.
		var opts = _self.masks[mask] || mask || _self.masks["default"];
		return _format(value, opts.decimals, opts.whole,
						opts.section, opts.decimal,
						opts.base);
	};
};
