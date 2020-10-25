import React ,{useState}from 'react'
import './style.scss'
import logo from '../../img/logo_transparent.png'
import {Link, withRouter} from "react-router-dom"
import Axios from "axios";

function Sign(props) {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    Axios.post("http://127.0.0.1:8000/sign/",data)
      .then(res => {
        const location = {
          pathname: "/teachercenter",
          state: {user: res.data.user}
        }
        props.history.push(location)
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="sign_wrapper">
      <div className="img"><img src={logo} alt=""/></div>
      <div className="wrapper">
        <div className="title">用户登录</div>
        <form className="form-group">
          <div className="form-item">
            <label htmlFor="email">邮箱</label>
            <input 
            type="text" 
            id="email" 
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-item">
            <label htmlFor="password">密码</label>
            <input 
            type="password" 
            id="password"
            className="form-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className="sign_in" onClick={handleClick}>登录</button>
          <div className="login_link">
          <Link to="/login">没有账号?点此注册</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withRouter(Sign)
