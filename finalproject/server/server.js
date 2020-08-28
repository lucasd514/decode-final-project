const express = require("express");
const { testReq, handleUpdateTeam } = require("./handles");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");
require("dotenv").config();

const {
  handleGetSerieA,
  handleCreateUser,
  handleGetAllTeams,
  handleCreatePlayer,
  handleGetAllPlayers,
  handleGetPlayerBySquad,
  handleUpdatePlayerDB,
  handleGetUserTeam,
  handleUpdateUserTeam,
  handleGetMyPlayer,
  handleGetAllUserTeams,
} = require("./handles.js");
const app = express();
const port = 8000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("coronaviruuuuuuuuuuu rona rona rona");
});

app.get("/test", handleGetSerieA);
app.get("/teams", handleGetAllTeams);
app.post("/user", handleCreateUser);
app.put("/user", handleUpdateTeam);
app.post("/usersquadra", handleGetUserTeam);
app.put("/updateusersquadra", handleUpdateUserTeam);
app.get("/alluserteams", handleGetAllUserTeams);
app.post("/giocatore", handleCreatePlayer);
app.get("/ognigiocatore", handleGetAllPlayers);
app.put("/giocatore", handleUpdatePlayerDB);
app.get("/ognigiocatore/:squadra", handleGetPlayerBySquad);
app.get("/myplayer/:id", handleGetMyPlayer);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
