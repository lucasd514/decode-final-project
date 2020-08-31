import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";
import SubmitTeam from "./SubmitTeam";

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
    console.log(e.target);
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
      <Wrapper style={{ margin: "20px 50px" }}>
        <div>
          <div>YOUR TEAM </div>
          <div>players: {selectedPlayers.length} /15</div>
          <div>YourTeam Value: {teamValue}</div>
          <SubmitTeam />
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
                <div
                  onClick={removePlayer}
                  value={player.player_id}
                  id={player.player_id}
                  key={player.player_id}
                >
                  {player.player_name}
                </div>

                <PlayerStats id={player.player_id}>
                  {player.team_name}
                </PlayerStats>
                <PlayerStats id={player.player_id}>
                  goals:{player.goals.total}
                </PlayerStats>
                <PlayerStats id={player.player_id}>
                  assists:{player.goals.assists}
                </PlayerStats>
                <PlayerStats id={player.player_id}>
                  Yellow cards:{player.cards.yellow}
                </PlayerStats>
                <PlayerStats id={player.player_id}>
                  Red cards:{player.cards.red}
                </PlayerStats>
              </Player>
            );
          })
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: 3px #504f4c solid;
  border-radius: 20px;
  margin-left: 10vw;
  background: rgb(240, 188, 66, 0.7);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 20vh));
  padding-left: 75px;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 2em;
  width: 50vw;
`;

const Player = styled.div`
  color: white;
  border: 2px #504f4c solid;
  border-radius: 3px;
  background-color: rgb(202, 202, 204, 0.6);
  :hover {
    background-color: rgb(134, 38, 51, 0.6);
    cursor: pointer;
  }
`;

const PlayerStats = styled.div`
  background-color: 504f4c;
  opacity: 0.7;
`;
export default Createteam;
