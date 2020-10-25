import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { TextField, MenuItem, Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Axios from "axios";
function Login() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [accountType, setAccountType] = useState("学生");

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      accountType,
    };
    Axios.post("http://127.0.0.1:8000/login/", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="login_wrapper">
      <div className="wrapper">
        <input type="checkbox" className="check" />
        <div className="login_btn">
          <Button variant="contained" color="primary" className="login">
            点击注册
          </Button>
          <ArrowDropDownIcon />
        </div>
        <div className="form-wrapper">
          <form noValidate autoComplete="off">
            <h2>注册</h2>
            <TextField
              label="用户名"
              className="form-text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              type="email"
              label="邮箱"
              className="form-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="密码"
              className="form-text"
              value={password}
              onChange={(e) => setPassWord(e.target.value)}
            />
            <TextField
              id="select"
              label="账号类型"
              value={accountType}
              select
              className="form-text"
              onChange={(e) => setAccountType(e.target.value)}
            >
              <MenuItem value="教师">教师</MenuItem>
              <MenuItem value="学生">学生</MenuItem>
            </TextField>
            <div className="btn-account">
              <Button
                variant="contained"
                color="primary"
                className="btn"
                onClick={handleClick}
              >
                注册账号
              </Button>
            </div>
            <div className="sign-link">
              <Link to="/sign">
                <h4>已有账号,点我登录</h4>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
