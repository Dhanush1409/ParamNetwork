var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient

var url = "mongodb://localhost:27017/login-app"
var User = require('./model/user')
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/login',(req,res)=>{
    let username = req.body.username;
    console.log(username);
    let password = req.body.password;
    let newuser =
        {username:username,password:password};
    console.log(newuser);
    MongoClient.connect(url,{ha:true,KeepAlive:true},{
        useNewUrlParser:true,
        useUnifiedToplogy:true,
        useUnifiedTopology:true
    
    },function(err,db){

        var dbo = db.db("Mydbase");
        dbo.collection("NewUser").insertOne(newuser,(err,res)=>{
        if(err) console.log(err);
        console.log("Data Inserted into NewUser");
         })
        dbo.collection("NewUser").find().toArray((err,data)=>{
        console.log(data);
        })
        db.close()
    
    })
    res.end("Bye");
})
app.listen(8081,(err,data)=>{
    if(err) console.log(err)
    console.log("server in running");
});