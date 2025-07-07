const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.MONGO_URL;
const dbName = "movie_27june25";

// ✅ Reusable DB helper
async function getCollection() {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const coll = db.collection("movies");
  return { client, coll };
}

// ✅ POST: Save Movie
app.post("/sm", async (req, res) => {
  try {
    const { client, coll } = await getCollection();
    const doc = { name: req.body.name, year: req.body.year, watched: false };
    const result = await coll.insertOne(doc);
    res.send(result);
    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Insert error", err });
  }
});

// ✅ DELETE: Delete Movie
app.delete("/dm", async (req, res) => {
  try {
    const { client, coll } = await getCollection();
    const filter = { _id: new ObjectId(req.body.id) };
    const result = await coll.deleteOne(filter);
    res.send(result);
    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Delete error", err });
  }
});

// ✅ GET: Get all Movies
app.get("/gm", async (req, res) => {
  try {
    const { client, coll } = await getCollection();
    const result = await coll.find().toArray();
    res.send(result); // ✅ Sends array
    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Fetch error", err });
  }
});

// ✅ PUT: Update Movie Watched Status
app.put("/um", async (req, res) => {
  try {
    const { client, coll } = await getCollection();
    const filter = { _id: new ObjectId(req.body.id) };
    const update = { $set: { watched: true } };
    const result = await coll.updateOne(filter, update);
    res.send(result);
    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Update error", err });
  }
});

app.listen(9000, () => {
  console.log("✅ Server ready at http://localhost:9000");
});
