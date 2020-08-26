import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import styled from "styled-components";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);
  const [userTeam, setUserTeam] = React.useState([]);

  useEffect(() => {
    if (appUser) {
      getUserTeam();
    }
  }, [appUser]);

  if (!appUser) {
    return <div>loading</div>;
  } else console.log("this pulls data");

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
          setUserTeam((prevState) => prevState.concat(json));
          // setState((prevState)>=prevState.concat(json))
        });
    }
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
        // setUserTeam(json.Team);
        getPlayerData(team);
      });

    let playerInfo = [];
  }

  return (
    <>
      <Wrapper>
        <div>YOUR TEAM</div>
        <div>YourTeam Value: X</div>
        {userTeam.map((player) => {
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
    </>
  );
}

const Wrapper = styled.div`
  border: 2px black solid;
`;

export default Createteam;
