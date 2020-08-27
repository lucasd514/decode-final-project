import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Createteam() {
  const {
    signInWithGoogle,
    appUser,
    setAppUser,
    selectedPlayers,
    setSelectedPlayers,
  } = useContext(AuthContext);

  function submitChanges(e) {
    e.preventDefault();

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

  console.log(selectedPlayers);
  return <button onClick={submitChanges}>Submit Changes</button>;
}

export default Createteam;
