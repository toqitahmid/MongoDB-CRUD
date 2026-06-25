const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello from Home');
})

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://SimpleUserCRUD:237HFZOuesPmjlgV@cluster0.mltnagh.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });

      const db = client.db("simple_crud");
      const userCollection = db.collection("users");

      app.get("/users", async (req, res) => {
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!",
      );
    } 
    catch (err) {
      console.error(err);
    }
}
run().catch(console.dir);

app.listen(port,() => {
    console.log(`express app listen on port ${port}`);
})

// SimpleUserCRUD
// 237HFZOuesPmjlgV

// //SimpleUserCRUD:237HFZOuesPmjlgV@cluster0.mltnagh.mongodb.net/?appName=Cluster0