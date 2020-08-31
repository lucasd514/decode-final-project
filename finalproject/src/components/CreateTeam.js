import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import CurrentTeam from "../components/createTeamfiles/CurrentTeam";
import CreateTeamPlayers from "../components/createTeamfiles/CreateTeamPlayers";
import SubmitTeam from "../components/createTeamfiles/SubmitTeam";
import SanSiro from "../Images/SanSiro2.jpg";
import styled from "styled-components";

function Createteam() {
  const { appUser } = useContext(AuthContext);

  return appUser ? (
    <>
      <BackDrop>
        <SubmitTeam />
        <Wrapper>
          <CreateTeamPlayers />
          <CurrentTeam />
        </Wrapper>
      </BackDrop>
    </>
  ) : (
    <BackDrop>
      <div>please sign in</div>
    </BackDrop>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const BackDrop = styled.div`
  background: url(${SanSiro}) no-repeat center fixed;
  background-size: cover;
  position: absolute;
  width: 98vw;
  height: 98vh;
`;
export default Createteam;
