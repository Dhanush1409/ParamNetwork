var MongoClient = require("mongodb").MongoClient;
var url = //"mongodb+srv://Dhanush:Dhanush000@demoproject.lymxp.mongodb.net/?retryWrites=true&w=majority"
"mongodb://localhost:27017/login-app"
MongoClient.connect(url,{ha:true},function(err,db){
  var dbo = db.db("Mydbase");
  dbo.collection("NewUser").createIndex({username:"text"})
  const projection ={username:1};
  //var query = {$text:{$search:"\"amertavarrsni\""}}
  var filter={
    username:"dhanush",
  }
  var updatedoc={
    $set:{username:"user1",password:"23"}
  };
  const result = (dbo.collection("NewUser").updateOne(filter,updatedoc)).then(
    res=>{
    console.log(`${res.n} is updated`)},
    err=>{console.log(`Something went wrong ${err}`)}
  )
  //console.log(temp)
  const cursor = dbo.collection("NewUser").find({})
  //.project(projection)
  //sort({password:1}).limit(2);
  
  console.log("async");
  /*(async function(){
    for await(const doc of cursor) {
      console.log(cursor.next());
    }
  })();*/
  (async function(){
    while (await cursor.hasNext()) {
      console.log(await cursor.next());
    }
    console.log(await cursor.count())
    await cursor.close()
  })();
  
})
