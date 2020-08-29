require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { plugPlayersDb, updateStats } = require("./fillDbPlayers");
const { handleUpdateUserScores } = require("./calculatePoints");

const assert = require("assert");
const ObjectID = require("mongodb").ObjectID;

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
//----------------------------functions

const handleGetMyPlayer = async (req, res) => {
  const getPlayerId = req.params.id;
  const sendID = Number(getPlayerId);
  console.log(sendID, typeof sendID);

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("fantacalcio");
    const r = await db.collection("playerDB").findOne({ player_id: sendID });
    client.close();

    console.log(r);
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
    console.log("something went wrong", err);
  }
};

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

const handleGetUserTeam = async (req, res) => {
  console.log("in", req.body.email);
  const emailUse = req.body.email;
  console.log("email", emailUse);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("fantacalcio");
    const r = await db.collection("users").findOne({ email: emailUse });
    client.close();

    console.log(r);
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
    console.log("something went wrong");
  }
};

const handleUpdateUserTeam = async (req, res) => {
  const emailUse = req.body.email;
  const teamUse = req.body.Team;
  console.log("in,", "email:", emailUse, "team", teamUse);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("fantacalcio");

    const response = await db.collection("users").updateOne(
      { email: emailUse },
      {
        $set: {
          Team: teamUse,
        },
        $currentDate: { lastModified: true },
      }
    );
    console.log("THIS RESPONSE================", response);
    console.log("THIS RESPONSECOUNT", response.matchedCount);

    assert.equal(1, response.matchedCount);
    assert.equal(1, response.modifiedCount);

    res.status(200).send({ update: "ok" });
  } catch (err) {
    console.log("somethingdied", err);
  }
  client.close();
};

const handleGetAllPlayers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("fantacalcio");
  const r = await db.collection("playerDB").find().toArray();
  client.close();

  console.log(r);

  res.status(200).json({ data: r });
  // try {
  //   const client = await MongoClient(MONGO_URI, options);
  //   await client.connect();
  //   const db = client.db("fantacalcio");
  //   const userTeam = await db
  //     .collection("users")
  //     .findOne({ email: "lucas.dalessandro@gmail.com" })
  //     .toArray();
  //   client.close();

  //   res.status(201).json({ status: 201, data: userTeam });
  // } catch (err) {
  //   res.status(500).json({ status: 500, message: err.message });
  // }
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
  const teamID = parseInt(req.params.squadra);
  console.log(team_id);

  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("fantacalcio");
  db.collection("players").find({ team_id: teamID }, (err, result) => {
    if (result) {
      console.log(result);
      console.log("ok done"), res.status(200).send(result);
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

        res.status(201).json({ status: 201, data: req.body });
      } catch (err) {
        res
          .status(500)
          .json({ status: 500, data: req.body, message: err.message });
      }
    }
  });
};

const handleUpdateTeam = async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);
  const userTeam = req.body.Team;

  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("fantacalcio");
    console.log("checking this email", userEmail);

    const response = await db.collection("users").updateOne(
      { email: userEmail },
      {
        $set: {
          Team: userTeam,
        },
        $currentDate: { lastModified: true },
      }
    );
    console.log("THIS RESPONSE================", response);
    console.log("THIS RESPONSECOUNT", response.matchedCount);

    assert.equal(1, response.matchedCount);
    assert.equal(1, response.modifiedCount);

    console.log("team updated");
  } catch (err) {
    console.log("somethingdied", req.body, err);
  }
  client.close();
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

const handleGetAllUserTeams = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("fantacalcio");
  const r = await db.collection("users").find().toArray();
  client.close();

  console.log(r);

  res.status(200).json({ data: r });
};

const handleGetTeamPage = async (req, res) => {
  console.log("in", req.params.id);
  const teamIdNumber = req.params.id;
  console.log("id no", teamIdNumber);
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("fantacalcio");
    const r = await db
      .collection("users")
      .findOne({ _id: new ObjectID(teamIdNumber) });
    client.close();

    console.log(r);
    res.status(200).send(r);
  } catch (err) {
    res.status(500).send(err);
    console.log("something went wrong");
  }
};

const handleUpdateEverything = async (req, res) => {
  try {
    await updateStats();

    await handleUpdateUserScores();

    res
      .status(201)
      .json({ status: 201, data: "all users and players updated" });
  } catch (err) {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
};

//ONLY ACTIVATE WHEN YOU NEED TO UPDATE OR UNTIL YOU GET MORE INFO///
// plugPlayersDb();
// testThis();
// handleUpdateScore();
// updateTeamPoints()
// handleGetAllUserTeams()
//////// ^^^^^^^^^^^^^^^^^^^^^^^
module.exports = {
  handleGetSerieA,
  handleCreateUser,
  handleGetAllTeams,
  handleCreatePlayer,
  handleGetAllPlayers,
  handleGetPlayerBySquad,
  handleUpdatePlayerDB,
  handleUpdateTeam,
  handleGetUserTeam,
  handleUpdateUserTeam,
  handleGetMyPlayer,
  handleGetAllUserTeams,
  handleUpdateEverything,
  handleGetTeamPage,
};
