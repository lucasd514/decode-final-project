import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import styled, { keyframes } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import Daje from "../Images/OlimpicoRoma.jpg";

function Admin() {
  const { appUser, setAppUser } = useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  function updateSite(team) {
    console.log("click");
    setLoading(true);

    fetch("/updategame", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 201) {
          window.alert(json.data);
          return true;
        }
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
      });
  }

  return appUser ? (
    appUser.email === "lucas.dalessandro@gmail.com" ? (
      <>
        <BackDrop />
        <Header />
        <Box>
          <button
            style={{ margin: "60px 30px 30px 180px" }}
            onClick={updateSite}
          >
            click to update
          </button>
          <div
            style={{
              display: loading ? "block" : "none",
            }}
          >
            <div>Please wait as the site is updated...</div>
            <LoadBox
              src={
                "https://cdn140.picsart.com/258941436015212.png?type=webp&to=min&r=240"
              }
              class="rotate"
            />{" "}
          </div>
        </Box>
      </>
    ) : (
      <>
        <Header />
        <BackDrop />
        <div>insufficient priveleges</div>
      </>
    )
  ) : (
    <>
      <Header />
      <BackDrop />
      <div>loading</div>
    </>
  );
}

const Box = styled.div`
  border: 3px #504f4c solid;
  padding: 3px 5px 3px 5px;
  background-color: rgb(240, 188, 66, 0.7);
  border-radius: 20px;
  width: 40vw;
  margin-top: 15vh;
  margin-left: 30vw;
  padding-bottom: 20px;
`;
const BackDrop = styled.div`
  background: url(${Daje}) no-repeat center fixed;
  background-size: cover;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1000;
`;

const rotate = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoadBox = styled.img`
  animation: ${rotate} 2s infinite linear;
  width: 100;
  height: 100;
`;
export default Admin;
