import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import Base from "./Base";
import Standings from "./Standings";
import Team from "./teampage";
import Login from "./Login";
import Createteam from "./CreateTeam";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/base">
          <Base />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/standings">
          <Standings />
        </Route>
        <Route exact path="/team-details">
          <Createteam />
        </Route>
        <Route exact path="/squadra/:id">
          <Team />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
