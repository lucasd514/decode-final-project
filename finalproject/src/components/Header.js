import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Header() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  return (
    <>
      {" "}
      <div>DAJE ROMA! </div>
      {appUser ? <div>welcome</div> : <div> please sign in</div>}
    </>
  );
}

export default Header;
