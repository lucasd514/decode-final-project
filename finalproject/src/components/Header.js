import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const { signInWithGoogle, appUser, setAppUser } = useContext(AuthContext);

  return (
    <>
      {" "}
      <Wrapper>
        <div>FantaCalcio</div>
        {appUser ? (
          <div>welcome</div>
        ) : (
          <Link to="/login">
            <div> please sign in</div>{" "}
          </Link>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: 3px black solid;
`;

export default Header;
