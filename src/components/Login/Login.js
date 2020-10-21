import React from "react";
import "./style.scss";
import { TextField, MenuItem, Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
function Login() {
  return (
    <div className="login_wrapper">
      <div className="wrapper">
        <div className="login_btn">
          <Button variant="contained" color="primary" className="login">
            点击注册
          </Button>
          <ArrowDropDownIcon />
        </div>

        <input type="checkbox" className="check" />

        <div className="form-wrapper">
          <form noValidate autoComplete="off">
            <h2>注册</h2>
            <TextField label="姓名" className="form-text" />
            <TextField type="email" label="邮箱" className="form-text" />
            <TextField type="password" label="密码" className="form-text" />
            <TextField
              id="select"
              label="账号类型"
              value="学生"
              select
              className="form-text"
            >
              <MenuItem value="教师">教师</MenuItem>
              <MenuItem value="学生">学生</MenuItem>
            </TextField>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
