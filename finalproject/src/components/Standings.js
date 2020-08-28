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
  const [allTeams, setAllTeams] = React.useState("");

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
        setAllTeams(json);
        console.log(json);
      });
    console.log(allTeams);
  }

  return <div>Standings go here</div>;
}

export default Standings;
