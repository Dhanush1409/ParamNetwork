const MongoClient = require('mongodb').MongoClient;
var assert= require('assert');
const url = 
"mongodb://localhost:30001,"+"localhost:30002,"+"localhost:30003/course?replicaSet=replica_set&readPreference=primaryPreferred";
MongoClient.connect(url,{ha:true,keepAlive:true},(error,db)=>{
    if(error) console.log(error);
    assert.equal(null,error)
    console.log("Connection establised");
    var dbo = db.db("mydb");
    //dbo.collection("repl").insertOne({name:"NewData"},(err,doc)=>{
        dbo.collection("repl").find().toArray((err,res)=>{
            if(err) console.log(err);
            console.log(res);
            db.close();
        })
    //})
})