import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function Team() {
  const teamNumber = useParams().id;
  console.log(teamNumber);
  const { signInWithGoogle, appUser, allPlayers } = useContext(AuthContext);
  console.log(teamNumber);

  const [team, setTeam] = React.useState([]);
  const [players, setPlayers] = React.useState([]);

  useEffect(() => {
    if (appUser) {
      getTeam();
    }
  }, [appUser]);
  // setSelectedPlayers((prevState) => prevState.concat(playerInfo[0]))

  function FillPage(teamPlayers) {
    for (let i = 0; i < teamPlayers.length; i++) {
      console.log(teamPlayers[i]);
      fetch(`/myplayer/${teamPlayers[i]}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("team", json);
          setPlayers((prevState) => prevState.concat(json));
        });
    }
  }

  function getTeam() {
    fetch(`/squadra/${teamNumber}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("team", json);
        setTeam(json);
        FillPage(json.Team);
      });

    console.log(players);
  }

  return team.Team ? (
    <>
      <div>View team Here {teamNumber}</div>

      {players.length > 4 ? (
        players.map((player) => {
          console.log(player);
          return <div>{player.player_name}</div>;
        })
      ) : (
        <div>loading team</div>
      )}
    </>
  ) : (
    <div>loading</div>
  );
}

export default Team;
