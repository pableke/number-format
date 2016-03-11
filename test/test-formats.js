
var nf = require('../lib/number-format');

function random(min, max) {
	return (Math.random() * (max || 10)) + (min || 1);
}

console.log("---------------");
console.log("formats -- test");
console.log("---------------");

Object.keys(nf.masks).forEach(function(mask) {
	var num = random(10, 1000);
	console.log(mask + " - " + num);
	console.log(nf.format(num, nf.masks[mask]));
});

console.log("\n\n");
console.log("-----------------");
console.log("toNumber --- test");
console.log("-----------------");

var _numbers = {
	"438274.32": "float",
	"483,2": {section: ".", decimal: ","} ,
	"0001-1111-1011": "binary",
	"01.b6": "hex"
};

Object.keys(_numbers).forEach(function(value) {
	console.log(_numbers[value] + " - " + value);
	console.log(nf.toNumber(value, _numbers[value]));
});
