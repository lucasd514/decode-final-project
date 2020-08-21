require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const dbFunction = async (fantacalcio) => {
//   // creates a new client
//   const client = await MongoClient(MONGO_URI, options);
//   //   // connect to the client
//   await client.connect();
//   //   // connect to the database (db name is provided as an argument to the function)
//   const db = client.db(fantacalcio); // <-- changed this as well
//   console.log("connected!");
//   //   // close the connection to the database server
//   client.close();
//   console.log("disconnected!");
// };

// dbFunction();

const handleGetSerieA = async (req, res, next) => {
  const Key = process.env.apiKey;

  console.log("open", "+key:", Key);

  const response = await fetch(
    "https://api-football-v1.p.rapidapi.com/v2/leagues/country/italy/2019",
    {
      method: "Get",
      headers: {
        "cache-control": "no-cache",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": Key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": Key,
        useQueryString: true,
      },
      body: "grant_type=client_credentials",
    }
  );

  const json = await response.json();

  return res.send(json);
};

const handleCreateUser = async (req, res) => {
  console.log(req.body.email);
  const email = req.body.email;
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("fantacalcio");
    const r = await db
      .collection("users")
      .insertOne(req.body, { unique: true });
    assert.equal(1, r.insertedCount);
    client.close();

    res.status(201).json({ status: 201, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};
module.exports = {
  handleGetSerieA,
  handleCreateUser,
};
