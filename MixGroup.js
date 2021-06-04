/*let myString = "Franklin Roosevelt";
let myRegex = /[\w+]/; // Change this line
let result = myRegex.test(myString);*/
let repeatNum = "42 42 42";
let reRegex = /(\w*)\s\1/; // Change this line
let result = reRegex.test(repeatNum);
console.log(result);