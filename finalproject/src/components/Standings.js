import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import CurrentTeam from "../components/createTeamfiles/CurrentTeam";
import CreateTeamPlayers from "../components/createTeamfiles/CreateTeamPlayers";
import SubmitTeam from "../components/createTeamfiles/SubmitTeam";
import styled from "styled-components";

function Standings() {
  const {
    signInWithGoogle,
    appUser,
    setAppUser,
    allPlayers,
    selectedPlayers,
    setSelectedPlayers,
  } = useContext(AuthContext);
  const [allTeams, setAllTeams] = React.useState([]);

  useEffect(() => {
    if (appUser) {
      getTeams();
    }
  }, [appUser, allPlayers]);

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
        console.log("sorted json", sortedTeam);
        setAllTeams(json.data);
      });
  }
  return allTeams.length > 2 ? (
    <>
      <div>teams are present</div>
      <ol>
        {allTeams.map((team) => (
          <div>
            <li>
              {team.displayName} <div>{team.totalPoints}</div>
            </li>
          </div>
        ))}
      </ol>
    </>
  ) : (
    <div>still waiting</div>
  );
}

export default Standings;
