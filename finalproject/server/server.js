const express = require("express");
const { testReq } = require("./handles");
const morgan = require("morgan");
const fetch = require("isomorphic-fetch");
require("dotenv").config();

const { handleGetSerieA } = require("./handles.js");
const app = express();
const port = 8000;
app.get("/", (req, res) => {
  res.send("coronaviruuuuuuuuuuu rona rona rona");
});

app.get("/test", handleGetSerieA);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
