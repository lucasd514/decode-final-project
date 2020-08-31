import React from "react";
import SanSiro from "../Images/SanSiro.jpg";
import styled, { keyframes } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";

function Homepage() {
  return (
    <BackDrop>
      <Header />
      <Motto>
        <Words>Fantacalcio</Words>
        <Wordstwo>please sign in:</Wordstwo>
        <GalleryButton>
          <Link exact to="/login">
            click here
          </Link>
        </GalleryButton>
      </Motto>
    </BackDrop>
  );
}

const BackDrop = styled.div`
  background: url(${SanSiro}) no-repeat center fixed;
  background-size: cover;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const WordsFade = keyframes`
  0% {
    opacity: 0%
  }
  }
  100% {
opacity:100%
  }
`;

const Words = styled.div`
  font-size: 4.3em;
  padding-bottom: 15px;
  animation: ${WordsFade} 2s;
  font-family: "Heebo", sans-serif;
  font-weight: 800;
  line-height: 5rem;
`;

const TwoFade = keyframes`
  0% {
    opacity: 0%
  }
  60% {
    opacity: 0%
  }
  }
  100% {
opacity:100%
  }
`;

const Wordstwo = styled.div`
  font-size: 3em;
  padding-bottom: 15px;
  animation: ${TwoFade} 3s;
  font-family: "Heebo", sans-serif;
  font-weight: 900;
`;

const Motto = styled.div`
  position: absolute;
  margin-top: 21vh;
  margin-left: 8vw;
  z-index: 1;
  color: white;
  display: flex;
  display: table-column;
  justify-content: center;
`;

const GalleryFade = keyframes`
  0% {
    opacity: 0%
  }
  70% {
    opacity: 0%
  }
  }
  100% {
opacity:100%
  }
`;

const GalleryButton = styled.button`
  font-size: 1.3em;
  padding: 15px 28px;
  z-index: 1;
  border: none;
  background-color: transparent;
  color: white;
  animation: ${GalleryFade} 4s;
  &:active {
    transform: translateY(2px);
  }
  a {
    text-decoration: none;
    color: white;
  }
`;

export default Homepage;
