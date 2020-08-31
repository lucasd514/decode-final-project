import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const { signInWithGoogle, appUser, setAppUser, handleSignOut } = useContext(
    AuthContext
  );

  function SignOut() {
    console.log("signmeout");
    handleSignOut();
  }

  function SignIn() {
    console.log("signmein");
    signInWithGoogle();
  }

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
        </Navig>
        <SignInOut>
          {appUser ? (
            <div onClick={SignOut}>
              <a href="/">Sign Out</a>
            </div>
          ) : (
            <div onClick={SignIn}>
              <a href="/login">Sign In</a>
            </div>
          )}
        </SignInOut>
      </Wrapper>
    </>
  );
}

const SignInOut = styled.div`
  margin-left: 50vw;
`;

const Linkto = styled.div`
  text-decoration: none;
  padding: 3px;
`;
const Navig = styled.nav`
  display: flex;
  text-decoration: none;
  margin-left: 20px;
`;

const Wrapper = styled.div`
  border-bottom: 3px black solid;
  display: flex;
  background: transparent;
  width: 99vw;
  background-color: rgb(202, 202, 204, 0.8);
`;

export default Header;
