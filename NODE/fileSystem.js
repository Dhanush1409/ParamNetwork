var fs = require('fs');
/*fs.readFile('main.js','utf8',function(err,data){
    if(err) console.log(err);
    console.log(data);
});
fs.writeFile('main1.js','writing something',function(err){
    if(err) console.log(err);
    console.log('something is written');

});
/*fs.appendFile('main1.js','console.log("appended")',function(err){
    console.log("Data saved")
});*/
fs.stat('index.txt',function(err,stats){
    if(err) console.log(err);
    console.log(stats);
    console.log("Got status sucessfully")
    console.log('isFile ?:',stats.isFile());
    console.log('Directory:',stats.isDirectory());
})