import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";

function Createteam() {
  const {
    appUser,
    selectedPlayers,
    setSelectedPlayers,
    setTeamValue,
    teamValue,
  } = useContext(AuthContext);
  const [currentUserTeam, setCurrentUserTeam] = React.useState([]);

  useEffect(() => {
    if (appUser) {
      getUserTeam();
    }
  }, [appUser]);

  function getPlayerData(team) {
    for (let i = 0; i < team.length; i++) {
      fetch(`/myplayer/${team[i]}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setSelectedPlayers((prevState) => prevState.concat(json));

          // setState((prevState)>=prevState.concat(json))
        });
    }
  }

  function getUserTeam() {
    let userEmail = appUser.email;
    fetch("/usersquadra", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        let team = json.Team;
        console.log(team);
        if (team) {
          getPlayerData(team);
        } else {
          setCurrentUserTeam("add players to your team");
        }
      });
  }

  async function removePlayer(e) {
    e.preventDefault();

    let playerId = e.target.id;
    let numberedId = Number(playerId);
    setSelectedPlayers((prevState) =>
      prevState.filter((player) => player.player_id != numberedId)
    );
  }

  function calculateValue() {
    if (selectedPlayers.length !== 0) {
      let values = selectedPlayers.map((player) => player.value);
      let total = null;
      values.forEach((value) => (total += value));

      return total;
    } else {
      return "no players on team yet!";
    }
  }
  setTeamValue(calculateValue());

  return (
    <>
      <Wrapper style={{ margin: "10px 50px" }}>
        <div>
          <div>YOUR TEAM </div>
          <div>players: {selectedPlayers.length} /15</div>
          <div>YourTeam Value: {teamValue}</div>
        </div>

        {selectedPlayers.length === 0 ? (
          <div>add players to your team</div>
        ) : (
          selectedPlayers.map((player) => {
            return (
              <Player
                onClick={removePlayer}
                value={player.player_id}
                id={player.player_id}
                key={player.player_id}
              >
                <div> {player.player_name}</div>
                <div>{player.team_name}</div>
                <div>Goals:{player.goals.total}</div>
                <div>Assists:{player.goals.assists}</div>
                <div>Yellow cards:{player.cards.yellow}</div>
                <div>Red cards:{player.cards.red}</div>
              </Player>
            );
          })
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: 2px black solid;
  margin-left: 10vw;
  background: transparent;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 20vh));
  padding: 3px 5px;
  gap: 2em;
  width: 80vw;
`;

const Player = styled.div`
  color: white;
  border: 2px black solid;
  border-radius: 3px;
  background-color: rgb(202, 202, 204, 0.6);
  :hover {
    background-color: rgb(134, 38, 51, 0.6);
    cursor: pointer;
  }
`;

export default Createteam;
