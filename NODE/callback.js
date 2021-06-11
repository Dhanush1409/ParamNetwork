var fs = require("fs");
/*var data = fs.readFileSync('index.txt');

console.log(data.toString());//blocking*/

fs.readFile('index.txt',function(err,data){
    if(err) console.log(err);
    else{
        console.log(data.toString());
    }
});//Non-blocking

console.log("Program Ended");