import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

function Admin() {
  const { appUser, setAppUser } = useContext(AuthContext);

  function updateSite(team) {
    console.log("click");

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
        }
      });
  }

  return appUser ? (
    appUser.email === "lucas.dalessandro@gmail.com" ? (
      <button onClick={updateSite}>click to update</button>
    ) : (
      <div>insufficient priveleges</div>
    )
  ) : (
    <div>loading</div>
  );
}

export default Admin;
