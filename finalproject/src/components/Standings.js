import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import Header from "./Header";

import styled from "styled-components";

function Standings() {
  const { appUser } = useContext(AuthContext);
  const [allTeams, setAllTeams] = React.useState([]);

  useEffect(() => {
    if (appUser) {
      getTeams();
    }
  }, [appUser]);

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
      <div>teams are present</div>
      <ol>
        {allTeams.map((team) => {
          let linkto = "squadra/" + team._id;
          return (
            <li>
              <Link exact to={linkto}>
                <div>{team.displayName}</div>
              </Link>

              <div>{team.totalPoints}</div>
            </li>
          );
        })}
      </ol>
    </>
  ) : (
    <div>still waiting</div>
  );
}

export default Standings;
