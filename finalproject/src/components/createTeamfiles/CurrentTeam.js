import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import Players from "./players";
function Createteam() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);
  const [userTeam, setUserTeam] = React.useState(null);

  useEffect(() => {
    if (appUser) {
      getUserTeam();
    }
  }, [appUser]);

  if (!appUser) {
    return <div>loading</div>;
  } else console.log("this is appuser in Team", appUser.email);

  function getUserTeam() {
    let userEmail = appUser.email;
    fetch("/getusersquadra", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.Team);
        setUserTeam(json.Team);
      });
  }
  console.log(userTeam);

  return (
    <>
      <div>CurrentTeamJs</div>
      <Players key={"player"} userteam={userTeam}></Players>
    </>
  );
}

export default Createteam;
