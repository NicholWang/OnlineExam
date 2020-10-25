import React from "react";
import { Route, Switch } from "react-router-dom";
import "./common.scss";

import HomePage from "./view/HomePage";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/index";
import TeacherPage from "./view/TeacherPage"
import UploadFile from "./components/UploadFile"

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
        <Route exact path="/sign">
          <Sign />
        </Route>
        <Route exact path="/teachercenter">
          <TeacherPage/>
        </Route>
        <Route exact path="/upload">
          <UploadFile/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
