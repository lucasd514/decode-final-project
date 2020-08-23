require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { plugPlayersDb, testThis } = require("./fillDbPlayers");

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

const handleGetAllPlayers = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("fantacalcio");
    const allplayers = await db.collection("players").find().toArray();
    client.close();

    res.status(201).json({ status: 201, data: allplayers });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

const handleUpdatePlayerDB = async (player) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("fantacalcio");
    const r = await db.collection("playerDB").insertOne(player);
    assert.equal(1, r.insertedCount);
    client.close();

    console.log("update good");
  } catch (err) {
    console.log("something went wrong");
  }
};

const handleGetPlayerBySquad = async (req, res) => {
  const team_id = parseInt(req.params.squadra);
  console.log(team_id);

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("fantacalcio");
  db.collection("users").find({ team_id }, (err, result) => {
    if (result) {
      console.log("ok done"),
        res.status(200).send({ status: 200, team_id, result });
    } else {
      try {
        ("nothing here");
        res.status(404).json({ status: 404, data: req.body });
      } catch (err) {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    }
    client.close();
  });
};

const handleGetAllTeams = async (req, res, next) => {
  const Key = process.env.apiKey;

  console.log("open", "+key:", Key);

  const response = await fetch(
    "https://api-football-v1.p.rapidapi.com/v2/players/team/496/2019-2020",
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
  const email = req.body.email;
  console.log(email);

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("fantacalcio");
  db.collection("users").findOne({ email }, (err, result) => {
    if (result) {
      console.log("ok done"),
        res.status(200).json({ status: 200, email, data: result });
    } else {
      try {
        const db = client.db("fantacalcio");
        db.collection("users").insertOne(req.body, { unique: true });
        assert.equal(1, r.insertedCount);

        res.status(201).json({ status: 201, data: req.body });
      } catch (err) {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    }
    client.close();
  });
};

const handleCreatePlayer = async (req, res) => {
  const player_id = req.body.player_id;
  console.log(player_id);

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("fantacalcio");
  db.collection("players").findOne({ player_id }, (err, result) => {
    if (result) {
      console.log("ok done, player exists"),
        res.status(200).json({ status: 200, player_id, data: result });
    } else {
      try {
        const db = client.db("fantacalcio");
        db.collection("players").insertOne(req.body, { unique: true });
        console.log("new player added");
        res.status(201).json({ status: 201, data: req.body });
      } catch (err) {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    }
    client.close();
  });
};
const handlePostUserDb = async (data) => {
  console.log(data);
  // const email = req.body.email;
};

// plugPlayersDb();
// testThis();
module.exports = {
  handleGetSerieA,
  handleCreateUser,
  handleGetAllTeams,
  handleCreatePlayer,
  handleGetAllPlayers,
  handleGetPlayerBySquad,
  handleUpdatePlayerDB,
};
