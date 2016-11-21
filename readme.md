# number-format

Node JS and JavaScript client side number format conversor.

## Usage

Some simple Node JS examples listed:
```js
	var nf = require("number-format");

	// Basic usage
	nf.format(1723.5);
	// 1,723.5

	// You can use one of several named masks
	nf.format(4567.25, "integer");
	// 4 567

	// ...Or add your own
	nf.masks.hammer = {section: "T", decimals: 4, decimal: "@"};
	nf.format(1543.045687, "hammer");
	// 1T543@0456

	// Reverse action: you can pass a string parameter in some format, and transform it in a number
	nf.toNumber("1101-0001", "binary");
	// 209
```
## License

(c) 2015-2016 Pablo Rosique, GitHub Inc.
