import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";

function Createteam() {
  const {
    signInWithGoogle,
    appUser,
    setAppUser,
    allPlayers,
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
  let thisteamValue = calculateValue();

  return (
    <>
      <Wrapper>
        <div>YOUR TEAM</div>
        <div>players: {selectedPlayers.length} /15</div>
        <div>YourTeam Value: {teamValue}</div>
        {selectedPlayers.length === 0 ? (
          <div>add players to your team</div>
        ) : (
          selectedPlayers.map((player) => {
            return (
              <div
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
                  name:{player.player_name}
                </div>
                <div>team:{player.team_name}</div>
                <div>goals:{player.goals.total}</div>
                <div>assists:{player.goals.assists}</div>
                <div>Yellow cards:{player.cards.yellow}</div>
                <div>Red cards:{player.cards.red}</div>
              </div>
            );
          })
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: 2px black solid;
`;

export default Createteam;
