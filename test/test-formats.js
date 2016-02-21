
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
	"float": "438274.32",
	"#.##0,0": "483.2",
	"binary": "0001-1111-1011",
	"hex": "01.b6"
};

Object.keys(_numbers).forEach(function(mask) {
	console.log(mask + " - " + _numbers[mask]);
	console.log(nf.toNumber(_numbers[mask], mask));
});
