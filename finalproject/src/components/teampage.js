import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import Olimpico from "../Images/Olimpico.jpg";
import Header from "./Header";

function Team() {
  const teamNumber = useParams().id;
  console.log(teamNumber);
  const { appUser } = useContext(AuthContext);
  console.log(teamNumber);

  const [team, setTeam] = React.useState([]);
  const [players, setPlayers] = React.useState([]);

  useEffect(() => {
    if (appUser) {
      getTeam();
    }
  }, [appUser]);
  // setSelectedPlayers((prevState) => prevState.concat(playerInfo[0]))

  function FillPage(teamPlayers) {
    for (let i = 0; i < teamPlayers.length; i++) {
      console.log(teamPlayers[i]);
      fetch(`/myplayer/${teamPlayers[i]}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("team", json);
          setPlayers((prevState) => prevState.concat(json));
        });
    }
  }

  function getTeam() {
    fetch(`/squadra/${teamNumber}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("team", json);
        setTeam(json);
        FillPage(json.Team);
      });

    console.log(players);
  }

  return team.Team ? (
    <>
      <BackDrop>
        <Header />
        <Link exact to="/standings">
          <div>Back To Standings </div>
        </Link>
        <Grid style={{ margin: "10px 50px" }}>
          {players.length > 4 ? (
            players.map((player) => {
              const toolTipContent =
                player.position === "Goalkeeper"
                  ? `Cost: ${player.value} Saves: ${
                      player.goals.saves
                    } Conceded: ${player.goals.conceded} Starts: ${
                      player.games.lineups
                    } Cards: Red: ${
                      player.cards.red + player.cards.yellowred
                    } Yellow: ${player.cards.yellow} `
                  : ` Cost: ${player.value} Goals: ${
                      player.goals.total
                    } Assists: ${player.goals.assists} Starts: ${
                      player.games.lineups
                    } Cards: Red: ${
                      player.cards.red + player.cards.yellowred
                    } Yellow: ${player.cards.yellow} `;
              return (
                <>
                  <Playerbox>
                    <Tippy content={toolTipContent}>
                      <PlayerName>
                        <Info>{player.player_name}</Info>
                        <Info>{player.totalPoints}pts</Info>
                      </PlayerName>
                    </Tippy>

                    <PlayerPoints>
                      <Info>Total Points: </Info>
                      {player.position === "Goalkeeper" ? (
                        <Info>Saves: {player.goalPoints}</Info>
                      ) : (
                        <Info>Goals: {player.goalPoints}</Info>
                      )}{" "}
                      <Info>Games Played: {player.gamePoints}</Info>
                      <Info>Card Penalties: -{player.cardPoints}</Info>
                    </PlayerPoints>
                  </Playerbox>
                </>
              );
            })
          ) : (
            <div>loading team</div>
          )}
        </Grid>
      </BackDrop>
    </>
  ) : (
    <>
      <BackDrop>
        <Header />
        <div>loading</div>
      </BackDrop>
    </>
  );
}

const Playerbox = styled.div`
  border: 2px black solid;
  border-radius: 2px;
`;

const PlayerName = styled.div`
  background-color: rgb(202, 202, 204, 0.3);
`;
const PlayerPoints = styled.div`
  background-color: rgb(240, 188, 66, 0.8);
`;
const Info = styled.div``;

const BackDrop = styled.div`
  background: url(${Olimpico}) no-repeat center fixed;
  background-size: cover;
  position: absolute;
  width: 98vw;
  height: 98vh;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 20vh));
  gap: 2em;
`;
export default Team;
