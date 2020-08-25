import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import CurrentTeam from "../components/createTeamfiles/CurrentTeam";
import CreateTeamPlayers from "../components/createTeamfiles/CreateTeamPlayers";
import SubmitTeam from "../components/createTeamfiles/SubmitTeam";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  console.log("this is appuser in Team", appUser);

  return (
    <>
      <CurrentTeam />
      <SubmitTeam />

      <CreateTeamPlayers />
    </>
  );
}

export default Createteam;
