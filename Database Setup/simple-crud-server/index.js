const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello from Home');
})

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
      console.log(
         "Pinged your deployment. You successfully connected to MongoDB!",
      );

      const db = client.db("simple_crud");
      const userCollection = db.collection("users");

      app.get("/users", async (req, res) => {
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      });

      app.get('/users/:id', async(req,res) => {
        const {id} = req.params;
        console.log(id);

          const query = {
            _id: new ObjectId(id),
          };
          const user = await userCollection.findOne(query);
          console.log(user);

          res.send(user);
      })

      app.post('/users', async(req,res) => {
        const newUser = req.body;
        console.log(newUser);
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      })

      app.patch('/users/:id', async(req,res) => {
        const {id} = req.params;
        const filter = {
          _id: new ObjectId(id)
        }
        const modifiedUser = req.body;
        const updatedDocument = {
          $set: {
            name: modifiedUser.name,
            email: modifiedUser.email,
            role: modifiedUser.role
          }
        }
        const result = await userCollection.updateOne(filter, updatedDocument);
        res.send(result);
      })

      app.delete('/users/:id', async(req,res) => {
        const {id} = req.params;
        console.log(id);

        const query = {
          _id: new ObjectId(id)
        }
        const result = await userCollection.deleteOne(query);
        res.send(result);
      })

     
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