import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Players(userTeam) {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);
  // const [renderPlayers, setRenderPlayers]=
  console.log(userTeam);

  if (userTeam.userteam) {
    const getAllPlayers = Object.values(userTeam);
    const allPlayers = getAllPlayers[0];
    for (let i = 0; i < allPlayers.length; i++) {
      console.log(allPlayers[i]);
      fetch(`/myplayer/${allPlayers[i]}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          let player = json;
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
        });
    }
  } else {
    return <div>loading</div>;
  }
}

export default Players;
