import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";

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
      {" "}
      {!appUser ? (
        <button onClick={handleGoogleSignIn}> Sign In with Google</button>
      ) : (
        <button onClick={SignOut}> laziale justin bieber</button>
      )}
      <Link exact to="/">
        <h1>ale ale roma ale</h1>
      </Link>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">{loggedIn}</div>{" "}
    </>
  );
}

export default Login;
