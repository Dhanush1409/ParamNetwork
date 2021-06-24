const { MongoClient } = require("mongodb");

const uri =
"mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=myRs";
//"mongodb+srv://Dhanush:Dhanush000@demoproject.lymxp.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    /*const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);*/
  } finally {

    await client.close();
  }
}
run().catch(console.dir);