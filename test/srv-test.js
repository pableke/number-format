
var nf = require('../number-format');

function random(min, max) {
	return (Math.random() * (max || 10)) + (min || 1);
}

console.log("---------------");
console.log("formats -- test");
console.log("---------------");

Object.keys(nf.masks).forEach(function(mask) {
	var num = random(100, 10000);
	var fmt = nf.format(num, mask);
	console.log(mask + " - " + num);
	console.log("format = " + fmt);
	console.log("toNumber = " + nf.toNumber(fmt, mask));
});

console.log("\n\n");
console.log("-----------------");
console.log("toNumber --- test");
console.log("-----------------");

var numbers = {
	"438274.32": "float",
	"483,2": {section: ".", decimal: ","} ,
	"0001-1111-1011": "binary",
	"01.b6": "hex"
};

Object.keys(numbers).forEach(function(value) {
	console.log(numbers[value] + " - " + value);
	console.log(nf.toNumber(value, numbers[value]));
});
