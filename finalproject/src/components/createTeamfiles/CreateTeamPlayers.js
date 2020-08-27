import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../AuthContext";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser, allPlayers } = useContext(
    AuthContext
  );
  const [teamId, setTeamId] = React.useState(497);

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
        <option value="497">Roma</option>
        <option value="867">Lecce</option>
        <option value="487">Lazio Shit</option>
        <option value="496">aaaGiuventus</option>
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
