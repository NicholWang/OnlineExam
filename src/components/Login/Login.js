import React, { useState , useRef} from "react";
import { Link , withRouter} from "react-router-dom";
import "./style.scss";
import { TextField, Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Axios from "axios";
function Login(props) {
  const circleRef = useRef();
  //学生状态
  const [stu_num,setStuNum] = useState("")
  const [stu_name, setStuName] = useState("")
  const [s_email,setSEmail] = useState("")
  const [s_password,setSPassword] = useState("")
  const [class_name, setClassName] = useState("")
  //教师状态
  const [teacher_num,setTeacherNum] = useState("");
  const [teacher_name,setTeacherName] = useState("");
  const [t_email,setTEmail] = useState("");
  const [t_password,setTPassword] = useState("");


  const handleTeacherClick = (e) => {
    e.preventDefault();
    const data = {
      teacher_name,
      email: t_email,
      password: t_password,
      teacher_num,
      account_type: '教师',
    };
   
    Axios.post("http://127.0.0.1:8000/teacherlogin", data)
      .then((res) => {
        if(res.data === 'success'){
          alert('注册成功')
          setTeacherNum("")
          setTeacherName("")
          setTEmail("")
          setTPassword("")
          props.history.push('/sign')
        }
        else if(res.data === '邮箱格式错误'){
          alert(`${res.data},请重新填写邮箱`)
          setTEmail("")
        }else if(res.data === '系统中没有您的信息,您没有注册权限'){
          alert(res.data)
          setTeacherNum("")
          setTeacherName("")
          setTEmail("")
          setTPassword("")
        }else{
          alert(res.data)
          setTeacherName("")
        }
      })
      .catch((err) => console.log(err));
  };
  const handleStudentClick = (e) => {
    e.preventDefault()
    const data = {
      stu_num,
      stu_name,
      email: s_email,
      password: s_password,
      class_name,
      account_type: '学生'
    }
    Axios.post("http://127.0.0.1:8000/studentlogin", data)
      .then(res => {
        console.log(res.data);
        if(res.data === 'success'){
          alert(res.data)
          setStuNum("")
          setStuName("")
          setSEmail("")
          setSPassword("")
          setClassName("")
          props.history.push('/sign')
        }
        else if (res.data === '邮箱格式错误,请重新填写邮箱'){
          alert(res.data)
          setSEmail("")
        }else if (res.data === '系统中没有您的信息,您没有注册权限'){
          alert(res.data)
          setStuNum("")
          setStuName("")
          setSEmail("")
          setSPassword("")
          setClassName("")
        }else if (res.data === '学号错误,请重新填写'){
          alert(res.data)
          setStuNum("")
        }else if (res.data === "班级不存在,请重新填写班级"){
          alert(res.data)
          setClassName("")
        }
      })
      .catch(err => console.log(err))
  }
  const handleTech = () => {
    circleRef.current.style.display = 'none'
  }
  return (
    <div className="login_wrapper">
      <div className="wrapper">
      
        <input type="checkbox" className="check" />
        <input type="checkbox" id="stu"/>
          <label htmlFor="stu" className="student-wrapper" ref={circleRef}>
            学生注册
          </label>
          <input type="checkbox" id="tech"/>
          <label htmlFor="tech" className="teacher-wrapper" onClick={handleTech} >
            教师注册
          </label>
        <div className="login_btn">
          <Button variant="contained" color="primary" className="login">
            点击注册
          </Button>
          <ArrowDropDownIcon />
        </div>
       
         
        <div className="form-wrapper">
          <form noValidate autoComplete="off">
            <h2>学生注册</h2>
            <TextField
              label="用户名"
              className="form-text"
              value={stu_name}
              onChange={(e) => setStuName(e.target.value)}
            />
            <TextField
              type="email"
              label="邮箱"
              className="form-text"
              value={s_email}
              onChange={(e) => setSEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="密码"
              className="form-text"
              value={s_password}
              onChange={(e) => setSPassword(e.target.value)}
            />
            <TextField
              label="学号"
              value={stu_num}
              className="form-text"
              onChange={(e) => setStuNum(e.target.value)}
            />
            <TextField
              label="班级"
              value={class_name}
              className="form-text"
              onChange={(e) => setClassName(e.target.value)}
            />
            <div className="btn-account">
              <Button
                variant="contained"
                color="primary"
                className="btn"
                onClick={handleStudentClick}
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

        <div className="form-wrapper-1">
          <form noValidate autoComplete="off">
            <h2>教师注册</h2>
            <TextField
              label="用户名"
              className="form-text"
              value={teacher_name}
              onChange={(e) => setTeacherName(e.target.value)}
            />
            <TextField
              type="email"
              label="邮箱"
              className="form-text"
              value={t_email}
              onChange={(e) => setTEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="密码"
              className="form-text"
              value={t_password}
              onChange={(e) => setTPassword(e.target.value)}
            />
            <TextField
              label="职编"
              value={teacher_num}
              className="form-text"
              onChange={(e) => setTeacherNum(e.target.value)}
            />
      
            <div className="btn-account">
              <Button
                variant="contained"
                color="primary"
                className="btn"
                onClick={handleTeacherClick}
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

export default withRouter(Login);
