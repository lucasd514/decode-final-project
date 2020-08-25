import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Createteam() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  console.log("this is appuser in Team", appUser);
  return <div>Create team players</div>;
}

export default Createteam;
