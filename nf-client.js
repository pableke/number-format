
function NumberFormat() {
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

	function chunk(str, size) {
		var parts = Math.ceil(str.length / size);
		return lpad(str, parts * size);
	};

	/**
	 * _format(n, x, s, c, b)
	 *
	 * @param integer v: value to format
	 * @param integer x: length of whole part
	 * @param integer n: length of decimal part
	 * @param mixed   s: sections delimiter (default ,)
	 * @param mixed   c: decimal delimiter (default .)
	 * @param integer b: number base format (default base 10)
	*/
	var _format = function(v, x, n, s, c, b) {
		var num = b ? chunk((~~v).toString(b), x) : v.toFixed(Math.max(0, n));
		var re = new RegExp("[0-9a-f](?=([0-9a-f]{" + x + "})+" + (n > 0 ? "\\D" : "$") + ")", "gi");
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
		if (typeof v != "string") return v;
		var reWholePart = new RegExp("[\\s" + s + "]+", "g");
		var num = (b && (b != 10)) ? parseInt(v.replace(reWholePart, "").replace(c, ""), b)
									: parseFloat(v.replace(reWholePart, "").replace(c, "."));
		return isNaN(num) ? parseFloat(v) : num;
	};

	/**
	 * toNumber(value, mask)
	 *
	 * @param string value: input to convert
	 * @param string/object mask: input value format
	 */
	this.toNumber = function(value, mask) {
		var opts = masks[mask] || mask || masks.default;
		return _number(value, opts.section, opts.decimal, opts.base);
	};

	/**
	 * format(value, mask)
	 *
	 * @param integer value: value to format
	 * @param string/object mask: format to apply
	 */
	this.format = function(value, mask) {
		if (isNaN(+value)) return value; // return as it is.
		var opts = masks[mask] || mask || masks.default;
		return _format(value, opts.whole || 3, opts.decimals || 0, 
						opts.section, opts.decimal, opts.base);
	};
};
