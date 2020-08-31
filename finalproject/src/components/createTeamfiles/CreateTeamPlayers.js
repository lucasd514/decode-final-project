import React, { useContext } from "react";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import { AuthContext } from "../AuthContext";

function Createteam() {
  const {
    appUser,
    allPlayers,
    selectedPlayers,
    setSelectedPlayers,
  } = useContext(AuthContext);
  const [teamId, setTeamId] = React.useState("");

  function chooseTeam(e) {
    e.preventDefault();
    let teamNumber = e.target.value;
    let numberedTeamNumber = Number(teamNumber);

    setTeamId(numberedTeamNumber);
  }

  async function addplayer(e) {
    e.preventDefault();
    let playerId = e.target.id;
    let numberedId = Number(playerId);
    let playerCheck = selectedPlayers.find(
      (player) => player.player_id === numberedId
    );

    if (selectedPlayers.length >= 15) {
      window.alert("too many players homeboy, can't add anymore!");
    } else if (playerCheck) {
      window.alert("you already have this player!");
    } else {
      let playerInfo = await allPlayers.data.filter((player) => {
        return player.player_id === numberedId;
      });
      setSelectedPlayers((prevState) => prevState.concat(playerInfo[0]));
    }
  }

  console.log(selectedPlayers);
  return allPlayers.data ? (
    <Wrapper>
      <div>Team Select:</div>
      <label for="team">Team:</label>
      <select id="Team" name="Team" onChange={chooseTeam}>
        <option value="">View Players by Team:</option>
        <option value="496">aaaGiuventus</option>
        <option value="505">Inter</option>
        <option value="499">Atalanta</option>
        <option value="487">Lazie</option>
        <option value="497">Roma</option>
        <option value="489">Milan</option>
        <option value="492">Napoli</option>
        <option value="488">Sassuolo</option>
        <option value="504">Hellas Verona</option>
        <option value="502">Fiorentina</option>
        <option value="523">Parma</option>
        <option value="500">Bologna</option>
        <option value="494">Udinese</option>
        <option value="490">Cagliari</option>
        <option value="498">Sampdoria</option>
        <option value="503">Torino</option>
        <option value="495">Genoa</option>
        <option value="867">Lecce</option>
        <option value="518">SPAL</option>
        <option value="494">Brescia</option>
      </select>
      {allPlayers.data
        .filter((player) => {
          return player.team_id === teamId;
        })
        .map((player) => {
          const toolTipContent =
            player.position === "Goalkeeper"
              ? `Cost: ${player.value} Saves: ${player.goals.saves} Conceded: ${
                  player.goals.conceded
                } Starts: ${player.games.lineups} Cards: Red: ${
                  player.cards.red + player.cards.yellowred
                } Yellow: ${player.cards.yellow} `
              : ` Cost: ${player.value} Goals: ${player.goals.total} Assists: ${
                  player.goals.assists
                } Starts: ${player.games.lineups} Cards: Red: ${
                  player.cards.red + player.cards.yellowred
                } Yellow: ${player.cards.yellow} `;
          return (
            <Tippy content={toolTipContent}>
              <Player>
                <Player
                  onClick={addplayer}
                  value={player.player_id}
                  id={player.player_id}
                  key={player.player_id}
                >
                  {player.player_name}
                </Player>
              </Player>
            </Tippy>
          );
        })}
    </Wrapper>
  ) : (
    <div>loading</div>
  );
}
const Wrapper = styled.div`
  border: 2px black solid;
  width: 20vw;
`;
const Player = styled.div`
  background-color: rgb(240, 188, 66, 0.4);

  :hover {
    background-color: coral;
  }
`;

export default Createteam;
