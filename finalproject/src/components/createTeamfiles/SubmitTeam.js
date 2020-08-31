import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";

function Createteam() {
  const {
    signInWithGoogle,
    appUser,
    setAppUser,
    selectedPlayers,
    setSelectedPlayers,
    teamValue,
  } = useContext(AuthContext);

  function submitChanges(e) {
    e.preventDefault();
    if (teamValue > 100) {
      window.alert("brokey, drop some players!");
    } else {
      let playersArray = selectedPlayers.map((player) => {
        return player.player_id;
      });
      console.log(playersArray);
      let userEmail = appUser.email;
      fetch("/updateusersquadra", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          Team: playersArray,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        });
    }
  }

  console.log(teamValue);
  return <button onClick={submitChanges}>Submit Changes</button>;
}

const SubmitButton = styled.button`
  margin-top: 3px;
  padding: 0;
  border: none;
  background-color: red;
`;

export default Createteam;
