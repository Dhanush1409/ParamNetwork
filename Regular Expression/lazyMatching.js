let text = "<h1>Winter is coming</h1>";
let myRegex = /<.(\w+).?>/; // Change this line
let result = text.match(myRegex);
console.log(result);