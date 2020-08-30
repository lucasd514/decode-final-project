import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  return (
    <>
      {" "}
      <Wrapper>
        <div>
          <div>FantaCalcio</div>
          <div>
            {appUser ? (
              <div>welcome, {appUser.displayName}</div>
            ) : (
              <Link to="/login">
                <div> please sign in</div>{" "}
              </Link>
            )}
          </div>
        </div>
        <Navig>
          {" "}
          <Link to="/standings" style={{ textDecoration: "none" }}>
            <Linkto> Standings</Linkto>{" "}
          </Link>
          <Link to="/team-details" style={{ textDecoration: "none" }}>
            <Linkto> Your Team</Linkto>{" "}
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Linkto>Logout Page</Linkto>{" "}
          </Link>
        </Navig>
        <div>
          {appUser ? <button>Sign Out</button> : <button>Sign In</button>}
        </div>
      </Wrapper>
    </>
  );
}

const Linkto = styled.div`
  text-decoration: none;
  padding: 3px;
`;
const Navig = styled.nav`
  display: flex;
  text-decoration: none;
  margin-left: 20vw;
`;

const Wrapper = styled.div`
  border: 3px black solid;
  display: flex;
  background: transparent;
`;

export default Header;
