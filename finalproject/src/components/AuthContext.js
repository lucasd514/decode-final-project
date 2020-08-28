import React, { createContext, useEffect, useState } from "react";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AuthContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD92yt4fDZDLgl04d6U4ie_idKYfk_rdZo",
  authDomain: "fantacalcio-f1d72.firebaseapp.com",
  databaseURL: "https://fantacalcio-f1d72.firebaseio.com",
  projectId: "fantacalcio-f1d72",
  storageBucket: "fantacalcio-f1d72.appspot.com",
  messagingSenderId: "1075491049588",
  appId: "1:1075491049588:web:69f667eea99e452a21c121",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

function createUserWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

const AuthProvider = ({ children, signOut, user }) => {
  const [appUser, setAppUser] = useState(null);
  const [allPlayers, setAllPlayers] = useState({});
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamValue, setTeamValue] = useState();
  const [changes, setChanges] = useState();

  const handleSignOut = () => {
    signOut();
    setAppUser(null);
  };

  function getPlayerData(team) {
    fetch("/ognigiocatore", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setAllPlayers(json);
      });
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = () => {
    return firebase.auth().signInWithPopup(googleProvider);
  };

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      getPlayerData();
      setAppUser(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        appUser,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,
        setAppUser,
        allPlayers,
        selectedPlayers,
        setSelectedPlayers,
        setTeamValue,
        teamValue,
        changes,
        setChanges,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthProvider);
