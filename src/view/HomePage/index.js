import React from "react";
import {Link} from "react-router-dom"
import DisplayIndex from "../../components/DisplayIndex/DisplayIndex";
import "./style.scss";

function HomePage() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="nav">
        <Link to="/login">
          注册
        </Link>
        <span>/</span>
        <Link to="/sign">
          登录
        </Link>
        </div>
        <DisplayIndex />
      </div>
    </div>
  );
}

export default HomePage;
