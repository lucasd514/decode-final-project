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
////////////

const updateUserPointTotalDB = async (user, points) => {
  console.log(user, points);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("fantacalcio");

    const response = await db.collection("users").updateOne(
      { email: user },
      {
        $set: {
          totalPoints: points,
        },
        $currentDate: { lastModified: true },
      }
    );

    assert.equal(1, response.matchedCount);
    assert.equal(1, response.modifiedCount);

    console.log("points updated");
  } catch (err) {
    console.log("somethingdied", err);
  }
  client.close();
};

const updateTeamPoints = async (user) => {
  let totalUserPoints = 0;
  for (let i = 0; i < user.Team.length; i++) {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("fantacalcio");
    const r = await db
      .collection("playerDB")
      .findOne({ player_id: user.Team[i] });
    totalUserPoints += r.totalPoints;
    client.close();
  }
  updateUserPointTotalDB(user.email, totalUserPoints);
};

const tallyPoints = (r) => {
  r.forEach((user) => {
    updateTeamPoints(user);
  });
};

const handleUpdateUserScores = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("fantacalcio");
  const r = await db.collection("users").find().toArray();
  console.log(r);
  tallyPoints(r);
  client.close();

  //   console.log(r);
};

module.exports = {
  handleUpdateUserScores,
};
