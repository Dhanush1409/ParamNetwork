var MongoClient = require('mongodb').MongoClient
//var url = "mongodb://localhost:27017/mydb";
var url = "mongodb://localhost:27017/";
/*MongoClient.connect(url,function(err,db){
    if(err) console.log(err)
    console.log("Database Created");
    db.close()
})
MongoClient.connect(url,function(err,db){
    if(err) console.log(err);
    var dbo = db.db('mydb')
    /*dbo.createCollection('customers',function(err,data){
        if(err) console.log(err);
        console.log('Collection created!');
        db.close()
    })
    var myobj = 
      [{name : "karan" ,address:"Coimbatore"},
        {name: "Kamal" , address:"Coimbatore"}];
    //dbo.collection("customers").insertMany(myobj, function(err, res) {
    //if (err) throw err;
    //console.log("1 document inserted");
    //db.close();
  //});
})*/
MongoClient.connect(url, function(err, db) {
    if (err) console/log(err);
    var dbo = db.db("mydb");
    var query = { name:"Ashik" }
    var newdata ={$set:{name:"Naresh",address:"Coimbatore"}}
    dbo.collection("customers").updateOne(query, newdata,function(err, result) {
      if (err) console.log(err);
      //console.log(result);
      console.log("Document Updated");
      db.close();
    });
    dbo.collection("customers").find().limit(4).toArray(function(err,result){
      if(err) console.log(err);
      console.log(result);
      db.close()
    })
  });