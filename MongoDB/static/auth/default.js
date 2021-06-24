const { MongoClient } = require("mongodb");

const username = encodeURIComponent("Dhanush");
const password = encodeURIComponent("Dhanush000");
const clusterUrl = 
"demoproject.lymxp.mongodb.net/default?retryWrites=true&w=majority";

//const authMechanism = "DEFAULT";
const authMechanism ="SCRAM-SHA-1";
const uri =
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
  console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
