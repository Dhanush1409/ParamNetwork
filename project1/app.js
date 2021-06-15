const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Dhanush000',
  database: 'mydb'
});
con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

/*con.query('CREATE DATABASE mydb',function(err,result){
  if(err) console.log(err.stock);
  console.log("Database Created");
})
con.query("CREATE TABLE user(userid VARCHAR(255),name VARCHAR(255),dob VARCHAR(10),profession VARCHAR(255))",function (err,result){
  if(err) console.log(err);
  console.log("TABLE created");
})*/
var express = require('express');
var bodyPraser = require('body-parser');
var app1 = express();
app1.use(bodyPraser.urlencoded({
  extended:true
}))
app1.get("/",function(req,res){
  res.sendFile(__dirname+"/index.htm")
});
var data1;
app1.post('/adduser',function(req,res){
  let userid = req.body.userid;
  //console.log(userid)
  let name = req.body.name;
  //console.log(name);
  let dob = req.body.dob;
  //console.log(dob)
  let profession = req. body.profession;
  //console.log(profession)
  let newuser ={
    userid:userid,
    name:name,
    dob:dob,
    profession:profession
  };
  console.log(newuser);
  con.query('insert into user set ?',newuser,function(err,data){
    if(err) console.log(err);
    console.log('data inserted');
    res.end(JSON.stringify(newuser));
  })
  con.query('select * from user',function(err, data){
    if(err) console.log(err);
    data.forEach((row)=>{
      console.log(`${row.userid} ${row.name} ${row.dob} ${row.profession}`);
    });
  })
  console.log('session ended');
  res.end('session ended');
})

app1.listen('8081',function(err,data){
  if(err) console.log(err);
  console.log('Server is running');
});

