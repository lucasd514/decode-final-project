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

const updatePlayerDB = async (player) => {
  console.log("goals", player.goals.total);
  console.log("cards", player.cards.yellow);
  console.log("lineup", player.games.lineups);
  console.log("penalties", player.penalty.missed);

  /////////points calculator
  const totalGoals =
    player.goals.total * 3 +
    player.goals.assists +
    player.goals.conceded * -1 +
    player.goals.saves * 0.5 +
    player.penalty.missed * -5;
  const totalCards =
    player.cards.yellow + player.cards.yellowred * 4 + player.cards.red * 5;
  const totalGames = player.games.lineups;
  const pointsTotal = totalGoals - totalCards + totalGames;
  console.log(
    "total goals",
    totalGoals,
    "total cards",
    totalCards,
    "total games",
    totalGames,
    "total points",
    pointsTotal
  );

  //////points calculator ends/////////////////
  const playerID = player.player_id;
  const playerShots = player.shots;
  const playerGoals = player.goals;
  const playerPasses = player.passes;
  const playerTackles = player.tackles;
  const playerDuels = player.duels;
  const playerDribbles = player.dribbles;
  const playerFouls = player.fouls;
  const playerCards = player.cards;
  const playerPenalty = player.penalty;
  const playerGames = player.games;
  const playerSubs = player.substitutes;

  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("fantacalcio");
    console.log("PLAYERID---------", playerID);
    if (player === undefined) {
      throw new Error("Missing info");
    }
    const response = await db.collection("playerDB").updateOne(
      { player_id: playerID },
      {
        $set: {
          totalPoints: pointsTotal,
          gamePoints: totalGames,
          goalPoints: totalGoals,
          cardPoints: totalCards,

          shots: playerShots,
          goals: playerGoals,
          passes: playerPasses,
          tackles: playerTackles,
          duels: playerDuels,
          dribbles: playerDribbles,
          fouls: playerFouls,
          cards: playerCards,
          penalty: playerPenalty,
          games: playerGames,
          substitutes: playerSubs,
        },
        $currentDate: { lastModified: true },
      }
    );

    assert.equal(1, response.matchedCount);
    assert.equal(1, response.modifiedCount);

    console.log("playerdone");
  } catch (err) {
    console.log("somethingdied", err);
  }
  client.close();
};

const updateStats = async (req, res, next) => {
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

    await filteredPlayers.forEach(async (player) => {
      console.log("thisid got run", player.player_id);
      // runPlayerDB(player);
      updatePlayerDB(player);
    });
  }
};

module.exports = {
  updateStats,
};
