require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const assert = require("assert");
const fetch = require("node-fetch");

require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const teamsByID = [
  496,
  505,
  499,
  487,
  497,
  489,
  492,
  488,
  504,
  502,
  523,
  500,
  494,
  490,
  498,
  503,
  495,
  867,
  518,
  493,
];

const runPlayerDB = async (player) => {
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

const testThis = async (req, res, next) => {
  const Key = process.env.apiKey;

  console.log("open", "+key:", Key);

  for (let i = 0; i < teamsByID.length; i++) {
    console.log(teamsByID[i]);

    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v2/players/team/${teamsByID[i]}/2019-2020`,
      {
        method: "Get",
        headers: {
          "X-RapidAPI-Key": Key,
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      }
    );

    const teamInfo = await response.json();
    let players = await teamInfo.api.players;

    function moreThanFive(player) {
      if (player.games.appearences > 5) {
        return true;
      } else {
        return false;
      }
    }
    function serieAPlayed(player) {
      if (player.league === "Serie A") {
        return true;
      }
    }
    function thisSeason(player) {
      if (player.season === "2019-2020") {
        return true;
      }
    }

    let filteredPlayers = await players.filter(
      (player) =>
        moreThanFive(player) && serieAPlayed(player) && thisSeason(player)
    );
    console.log(filteredPlayers);

    await filteredPlayers.forEach(async (player) => {
      console.log("thisid got run", player.player_id);
      runPlayerDB(player);
    });
  }
};

module.exports = {
  testThis,
};
