import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Login() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const { signInWithGoogle } = useContext(AuthContext);
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
        setLoggedIn(true);
      });
  }

  return (
    <>
      {" "}
      <button onClick={handleGoogleSignIn}> Sign In with Google</button>
      <h1>ale ale roma ale</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>{" "}
    </>
  );
}

export default Login;
