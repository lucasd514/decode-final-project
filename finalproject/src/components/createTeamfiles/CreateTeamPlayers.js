import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../AuthContext";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser, allPlayers } = useContext(
    AuthContext
  );

  let teamId = 497;
  function filterPlayers() {
    allPlayers.filter((player) => player.id === teamId);
  }

  console.log("these are all my players", allPlayers);

  return allPlayers.data ? (
    <Wrapper>
      {allPlayers.data.map((player) => {
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
      })}
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
