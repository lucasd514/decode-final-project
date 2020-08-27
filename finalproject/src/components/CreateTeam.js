import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import CurrentTeam from "../components/createTeamfiles/CurrentTeam";
import CreateTeamPlayers from "../components/createTeamfiles/CreateTeamPlayers";
import SubmitTeam from "../components/createTeamfiles/SubmitTeam";
import styled from "styled-components";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  return appUser ? (
    <>
      <SubmitTeam />
      <Wrapper>
        <CreateTeamPlayers />
        <CurrentTeam />
      </Wrapper>
    </>
  ) : (
    <div>please sign in</div>
  );
}

const Wrapper = styled.div`
  border: 2px black solid;
  display: flex;
`;
export default Createteam;
