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
  const { appUser } = useContext(AuthContext);

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
        setTeam(json);
        FillPage(json.Team);
      });
  }

  return team.Team ? (
    <>
      <Wrapper>
        <BackDrop>
          <Header />
          <Link exact to="/standings">
            <div>Back To Standings </div>
          </Link>
          <Grid style={{ margin: "60px 0px 0px 60px" }}>
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
                    <Player>
                      <Tippy content={toolTipContent}>
                        <PlayerName>
                          <Info>{player.player_name}</Info>
                          <Info>{player.totalPoints}pts</Info>
                        </PlayerName>
                      </Tippy>

                      <div>
                        <Info>Total Points: </Info>
                        {player.position === "Goalkeeper" ? (
                          <Info>Saves: {player.goalPoints}</Info>
                        ) : (
                          <Info>Goals: {player.goalPoints}</Info>
                        )}{" "}
                        <Info>Games Played: {player.gamePoints}</Info>
                        <Info>Card Penalties: -{player.cardPoints}</Info>
                      </div>
                    </Player>
                  </>
                );
              })
            ) : (
              <div>loading team</div>
            )}
          </Grid>
        </BackDrop>
      </Wrapper>
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

const Player = styled.div`
  color: white;
  border: 2px #504f4c solid;
  border-radius: 3px;
  background-color: rgb(202, 202, 204, 0.6);
  :hover {
    background-color: rgb(134, 38, 51, 0.6);
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: relative;
  overflow-y: scroll;
  position: relative;
`;

const Playerbox = styled.div`
  border: 2px black solid;
  border-radius: 2px;
`;

const PlayerName = styled.div`
  background-color: rgb(202, 202, 204, 0.3);
`;

const Info = styled.div``;

const BackDrop = styled.div`
  background: url(${Olimpico}) no-repeat center fixed;
  background-size: cover;
  background-attachment: fixed;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1000000;
  overflow: scroll;
`;
const Grid = styled.div`
  border: 3px #504f4c solid;
  border-radius: 20px;
  margin-left: 5vw;
  background: rgb(240, 188, 66, 0.7);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 20vh));
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 2em;
  width: 70vw;
  z-index: 2;
`;
export default Team;
