import React from 'react'
import "./style.scss"
import Logo from "../../img/center.png"
import {Divider} from "@material-ui/core"
import DrawerItem from "../DrawerItem"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
function Navbar(props) {
  const {user} = props;
  return (
    <div className="nav-bar">
      <div className="nav-title">
        <img src={Logo} alt=""/>
        <h4>OnlineExam</h4>
      </div>
      <Divider className="horizon"/>
      <DrawerItem {...{title: `欢迎你,${user}`, item:[]}}/>
      <DrawerItem {...{title:"添加题目",item: []}}/>
      <DrawerItem {...{title:"学生管理",item :["添加学生","查询成绩","修改成绩"]}}/>
      <DrawerItem {...{title:"创建考试",item:[]}}/>
      <DrawerItem {...{title:"批阅试卷",item:[]}}/>
      <div className="hide">
      <KeyboardArrowLeftIcon/>
      </div>
     
    </div>
  )
}

export default Navbar
