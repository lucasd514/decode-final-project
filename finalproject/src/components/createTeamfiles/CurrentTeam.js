import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import Players from "./players";
function Createteam() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);
  const [userTeam, setUserTeam] = React.useState(null);

  useEffect(() => {
    if (appUser) {
      getUserTeam();
    }
  }, [appUser]);

  if (!appUser) {
    return <div>loading</div>;
  } else console.log("this is appuser in Team", appUser.email);

  function getPlayerData(team) {
    let playerInfo = [];
    console.log("get player data", team);
    for (let i = 0; i < team.length; i++) {
      fetch(`/myplayer/${team[i]}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          playerInfo.push(json);
        });
      console.log("ssssssssssssssssss", userTeam);
    }
    console.log("pplayer info at bootm of 2nd get", playerInfo);
    return setUserTeam(playerInfo);
  }

  function getUserTeam() {
    let userEmail = appUser.email;
    fetch("/getusersquadra", {
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
        console.log(json.Team);
        // setUserTeam(json.Team);
        getPlayerData(team);
      });

    let playerInfo = [];
  }
  console.log(userTeam);

  return (
    <>
      <div>CurrentTeamJs</div>
      {/* <Players key={"player"} userteam={userTeam}></Players> */}
    </>
  );
}

export default Createteam;
