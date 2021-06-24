const { MongoClient } = require("mongodb");

const accessKeyId = encodeURIComponent("example-user1");
//const secretAccessKey = encodeURIComponent("IAMUSER");
//mongodb+srv://Dhanush:<password>@demoproject.lymxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const clusterUrl = "demoproject.lymxp.mongodb.net/test?retryWrites=true&w=majority"
const authMechanism = "MONGODB-AWS";

// Replace the following with your MongoDB deployment's connection string.
const uri =
  `mongodb+srv://${accessKeyId}:@${clusterUrl}/?authMechanism=${authMechanism}`;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to connect to the server
async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
