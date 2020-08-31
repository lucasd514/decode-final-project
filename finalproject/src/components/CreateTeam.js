import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import CurrentTeam from "../components/createTeamfiles/CurrentTeam";
import CreateTeamPlayers from "../components/createTeamfiles/CreateTeamPlayers";
import Header from "../components/Header.js";
import SanSiro from "../Images/SanSiro2.jpg";
import styled from "styled-components";

function Createteam() {
  const { appUser } = useContext(AuthContext);

  return appUser ? (
    <>
      <Wrapper>
        <BackDrop />
        <div>
          <Header />
          <PlayerBoxes>
            <CreateTeamPlayers />
            <CurrentTeam />
          </PlayerBoxes>
        </div>
      </Wrapper>
    </>
  ) : (
    <BackDrop>
      <Header />
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
  background-attachment: fixed;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1000000;
`;

const PlayerBoxes = styled.div`
  display: flex;
`;
export default Createteam;
