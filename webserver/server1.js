var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.get('/',function(req,res){
    res.send('welcome');
});
app.get('/Home',function(req,res){
    res.send('In Home page');
});
app.get('/index.htm',function(req,res){
    res.sendFile(path.resolve("./index.htm" ));
});
app.get('/process_get' ,function(req ,res){
    response={
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
app.get('/index1.htm',function(req,res){
    res.sendFile(__dirname+"/index1.htm");
})
app.post('/process_post' ,urlencodedParser,function(req ,res){
    response={
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
var server1=app.listen(8081,function(req,res){
    var host = server1.address().address;
    var port = server1.address().port;
    console.log('Listening to https://%s:%s',host,port);
});