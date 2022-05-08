const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://fruit:dQS5c7V0DFnCbtSv@cluster0.oqwaa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
//
//   console.log("dev connection");
//   // perform actions on the collection object
//   client.close();
// });
async function footRun() {
  try {
    await client.connect();
    const fruitCollection = client.db("fruits-warehouse").collection("product");
    app.get("/fruits", async (req, res) => {
      const cursor = fruitCollection.find();
      const services = await cursor.toArray();
      res.send(services);
    });
    app.get("/fruit/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await fruitCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
footRun().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  console.log("lenten", port);
});

// fruit
// dQS5c7V0DFnCbtSv
