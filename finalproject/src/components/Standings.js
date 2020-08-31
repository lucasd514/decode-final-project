import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import Header from "./Header";
import Ferraris from "../Images/Ferraris.jpg";
import styled from "styled-components";

function Standings() {
  const { appUser, selectedPlayers } = useContext(AuthContext);
  const [allTeams, setAllTeams] = React.useState([]);

  useEffect(() => {
    if (appUser) {
      getTeams();
    }
  }, [appUser]);

  console.log(selectedPlayers);
  function getTeams() {
    fetch("/alluserteams", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const sortedTeam = json.data.sort(
          (a, b) => b.totalPoints - a.totalPoints
        );
        setAllTeams(sortedTeam);
      });
  }

  return allTeams.length > 2 ? (
    <>
      <Header />
      <BackDrop />
      <Table>
        <Header2>Standings</Header2>
        {allTeams.map((team) => {
          let linkto = "squadra/" + team._id;
          return (
            <ListItem>
              <Link exact to={linkto}>
                <div>{team.displayName}</div>
              </Link>

              <div>{team.totalPoints}</div>
            </ListItem>
          );
        })}
      </Table>
    </>
  ) : (
    <div>loading</div>
  );
}

const Header2 = styled.h2`
  margin-bottom: 10px;
  padding: 5px;
`;
const ListItem = styled.li`
  margin-left: 50px;
  :hover {
    background-color: rgb(134, 38, 51, 0.6);
    width: 20vw;
  }
`;
const Table = styled.ol`
  border: 3px #504f4c solid;
  padding: 3px 5px 3px 5px;
  background-color: rgb(240, 188, 66, 0.7);
  border-radius: 20px;
  width: 40vw;
  margin-top: 20px;
  margin-left: 30vw;
  padding-bottom: 20px;
`;

const BackDrop = styled.div`
  background: url(${Ferraris}) no-repeat center fixed;
  background-size: cover;
  background-attachment: fixed;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1000000;
`;
export default Standings;
