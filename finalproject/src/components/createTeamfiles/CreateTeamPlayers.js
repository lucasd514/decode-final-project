import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../AuthContext";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser, allPlayers } = useContext(
    AuthContext
  );
  const [teamId, setTeamId] = React.useState("");

  const teamsByID = [
    496,
    505,
    499,
    487,
    497,
    489,
    492,
    488,
    504,
    502,
    523,
    500,
    494,
    490,
    498,
    503,
    495,
    867,
    518,
    493,
  ];
  function chooseTeam(e) {
    e.preventDefault();
    let teamNumber = e.target.value;
    let numberedTeamNumber = Number(teamNumber);
    console.log(numberedTeamNumber);
    console.log(typeof numberedTeamNumber);

    setTeamId(numberedTeamNumber);
  }
  console.log("these are all my players", allPlayers);
  // const filteredPlayers = allPlayers.data.filter((player) => {
  //   return player.team_id === teamId;
  // });

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
          return (
            <div>
              <div classname={player.player_id} key={player.player_id}>
                name:{player.player_name}
              </div>
            </div>
          );
        })}

      {/* {allPlayers.data.map((player) => {
        return (
          <div>
            <div>name:{player.player_name}</div>
            <div>team:{player.team_name}</div>
            <div>goals:{player.goals.total}</div>
            <div>assists:{player.goals.assists}</div>
            <div>Yellow cards:{player.cards.yellow}</div>
            <div>Red cards:{player.cards.red}</div>
          </div>
        );
      })} */}
    </Wrapper>
  ) : (
    <div>loading</div>
  );
}
const Wrapper = styled.div`
  border: 2px black solid;
  position: relative;
`;
export default Createteam;
