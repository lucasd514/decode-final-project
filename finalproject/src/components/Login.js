import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import SanPaolo from "../Images/SanPaolo.jpg";
import Header from "./Header";

function Login() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const { signInWithGoogle, handleSignOut, appUser, setAppUser } = useContext(
    AuthContext
  );
  const history = useHistory();

  function SignOut() {
    handleSignOut();
  }

  function handleGoogleSignIn() {
    signInWithGoogle()
      .then((data) => {
        return fetch("/user", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
          }),
        });
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // setAppUser(json);
        setLoggedIn(true);
      });
  }
  console.log(appUser, loggedIn);
  return (
    <>
      <BackDrop>
        <Header />{" "}
        <div>
          {!appUser ? (
            <button onClick={handleGoogleSignIn}> Click Here to Sign In</button>
          ) : (
            <div>
              <button onClick={SignOut}> laziale justin bieber</button>
              <div>Select an Option above</div>
            </div>
          )}
        </div>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">{loggedIn}</div>{" "}
      </BackDrop>
    </>
  );
}

const BackDrop = styled.div`
  background: url(${SanPaolo}) no-repeat center fixed;
  background-size: cover;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

export default Login;
