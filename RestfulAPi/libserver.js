var express = require('express');
var fs = require('fs');
const { stringify } = require('querystring');
var app = express();
app.get('/listuser',function(req,res){
    fs.readFile(__dirname+"/library.json",function(err,data){
        if(err) console.log(err);
        console.log(data.toString());
        res.end();
    })
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
 
 
 var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 4
     }
 };
 /*app.get('/adduser',function(req,res){
     fs.readFile(__dirname+'/library.json',function(err,data){
         data= JSON.parse(data);
         data["user4"] = user["user4"];
         console.log(data);
         res.end(JSON.stringify(data));
     })
 })
 app.get('/:id',function(req,res){
    fs.readFile(__dirname+"/library.json",function(err,data){
        var users = JSON.parse(data);
        var user = users["user"+req.params.id]
        console.log(user);
        res.end(JSON.stringify(user))
    })
})*/
var id =1;
app.get('/deleteuser',function(req,res){
    fs.readFile(__dirname+"/library.json",function(err,data){
        data = JSON.parse(data);
        delete data["user" + 1];
        console.log(data);
        res.end(JSON.stringify(data));
    })
})