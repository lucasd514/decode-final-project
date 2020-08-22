const express = require("express");
const { testReq } = require("./handles");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");
require("dotenv").config();

const {
  handleGetSerieA,
  handleCreateUser,
  handleGetAllTeams,
  handleCreatePlayer,
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
app.post("/giocatore", handleCreatePlayer);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
