const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://BridgingMinds:Hzr5LSUYpkVyAOve@cluster0.ojzbxix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // You can now use `client` to interact with your database
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

connectToMongoDB();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});