var fs = require("fs");
/*var data = fs.readFileSync('input.txt');

console.log(data.toString());*///blocking code
fs.readFile('input.txt', function (err, data) {
   if (err) return console.error(err);
   console.log(data.toString());
});//unblocking code

console.log("Program Ended");