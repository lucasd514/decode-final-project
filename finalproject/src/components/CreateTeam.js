import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import CurrentTeam from "../components/createTeamfiles/CurrentTeam";
import CreateTeamPlayers from "../components/createTeamfiles/CreateTeamPlayers";
import SubmitTeam from "../components/createTeamfiles/SubmitTeam";
import styled from "styled-components";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  console.log("this is appuser in Team", appUser);

  return (
    <>
      <SubmitTeam />
      <Wrapper>
        <CreateTeamPlayers />
        <CurrentTeam />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: 2px black solid;
  display: flex;
`;
export default Createteam;
