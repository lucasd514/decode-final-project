import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Players(userTeam) {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);
  console.log("player", userTeam);
  console.log("this is appuser in Team", appUser);
  return <div>player </div>;
}

export default Players;
