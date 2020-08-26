import React, { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../AuthContext";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser, allPlayers } = useContext(
    AuthContext
  );

  let teamId = 497;

  console.log("these are all my players", allPlayers);
  // const filteredPlayers = allPlayers.data.filter((player) => {
  //   return player.team_id === teamId;
  // });

  return allPlayers.data ? (
    <Wrapper>
      {allPlayers.data
        .filter((player) => {
          return player.team_id === teamId;
        })
        .map((player) => {
          return (
            <div>
              <div>name:{player.player_name}</div>
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
