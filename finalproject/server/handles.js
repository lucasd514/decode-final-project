require("dotenv").config();
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

module.exports = {
  handleGetSerieA,
};
