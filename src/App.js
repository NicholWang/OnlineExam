import React from "react";
import { Route, Switch } from "react-router-dom";
import "./common.scss";

import HomePage from "./view/HomePage";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
