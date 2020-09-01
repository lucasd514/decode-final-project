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
              <div> please sign in</div>
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
          {appUser ? (
            appUser.email === "lucas.dalessandro@gmail.com" ? (
              <Link to="/team-details" style={{ textDecoration: "none" }}>
                <Linkto>Admin</Linkto>
              </Link>
            ) : null
          ) : null}
        </Navig>
        <SignInOut>
          {appUser ? (
            <div onClick={SignOut}>
              <a href="/">Sign Out</a>
            </div>
          ) : (
            <div style={{ textDecoration: "underline", cursor: 'pointer'}} onClick={SignIn}>
              sign in
            </div>
          )}
        </SignInOut>
      </Wrapper>
    </>
  );
}

const SignInOut = styled.div`
  margin-left: 50vw;
  text-decoration: none;
  padding: 15px 20px;
`;

const Linkto = styled.div`
  text-decoration: none;
  padding: 3px;
  transition: width 2s;
  :hover {
    color: rgb(134, 38, 51);
    border-bottom: rgb(134, 38, 51) solid 2px;
  }
`;
const Navig = styled.nav`
  display: flex;
  color: darkgreen;
  text-decoration: none;
  padding: 15px 20px;
  position: relative;
  transition: width 2s;
`;

const Wrapper = styled.div`
  border-bottom: 1px black solid;
  display: flex;
  background: transparent;
  width: 100vw;
  background-color: rgb(202, 202, 204, 0.8);
`;

export default Header;
