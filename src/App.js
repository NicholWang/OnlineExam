import React from "react";
import { Route, Switch } from "react-router-dom";
import {useSelector} from "react-redux"
import "./common.scss";

import HomePage from "./view/HomePage";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/index";
import TeacherPage from "./view/TeacherPage"
import RootPage from "./view/RootPage"
import UploadFile from "./components/UploadFile"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const mapState = ({user}) => ({
  userinfo: user.currentUser
})
function App() {
  const {userinfo} = useSelector(mapState);
  console.log(userinfo);
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
         {userinfo ? <TeacherPage/> : <Redirect to="/sign"/>}
        </Route>
        <Route exact path="/rootcenter">
         {userinfo ? <RootPage/> : <Redirect to="/sign"/>}
        </Route>
        <Route exact path="/upload">
          <UploadFile/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
