import React ,{useState, useEffect, useRef}from 'react'
import {useDispatch} from "react-redux"
import './style.scss'
import logo from '../../img/logo_transparent.png'
import {Link, withRouter} from "react-router-dom"
import Axios from "axios";
import {setCurrentUser} from "../../Redux/User/user.action"


function Sign(props) {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch();
  const isMounted = useRef(true)

  const handleClick = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    setEmail("")
    setPassword("")
    const res = await Axios.post("http://127.0.0.1:8000/sign",data)
    if(!res.data.user){
          alert("用户名或密码错误,请重新登录!")
        }else{
          let location = {}
          const {user, type} = res.data;
          if(type === '管理'){
            location = {
              pathname: "/rootcenter",
              state: {user: user}
            }
          }else if(type === '学生'){
            location = {
              pathname: "/studentcenter",
              state: {user: user}
            }
          }
          else{
            location = {
              pathname: "/teachercenter",
              state: {user: user}
            }
          }
          dispatch(setCurrentUser({
            user: user
          }))
          props.history.push(location)
        }
      }



  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

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
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-item">
            <label htmlFor="password">密码</label>
            <input 
            type="password" 
            id="password"
            className="form-input" 
            autoComplete="off"
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
