let hello = "   Hello, World!   ";
let wsRegex = /^\s+|\s+$/; // Change this line
console.log(wsRegex);
let result = hello.replace(wsRegex,""); // Change this line
console.log(result);