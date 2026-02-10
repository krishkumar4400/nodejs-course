// // Named export

// exports.addFunction = function add(a, b) {
//   return a + b;
// };


// exports.subtractFunction = function sub(a, b) {
//   return a - b;
// }
// exports.multiply = function mul(a, b) {
//   return a * b;
// }
// exports.division = function div(a, b) {
//   return a / b;
// }


// const {xyz} = require('../test/a/b/test.js');
// console.log(xyz);

// default export
module.exports = function() {
  console.log("Hey, I am default");
}

