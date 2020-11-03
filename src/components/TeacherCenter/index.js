import React from 'react'
import {withRouter} from 'react-router-dom'
import AddCourse from '../AddCourse'
import Navbar from '../Navbar'
import './style.scss'

function TeacherCenter(props) {
  const {user} = props.location.state
  const columns = [
    {title: `欢迎你,${user}`, item:[]},
    {title:"添加课程",item: []},
    {title:"添加题目",item: []},
    {title:"学生管理",item :["添加学生","查询成绩","修改成绩"]},
    {title:"创建考试",item:[]},
    {title:"批阅试卷",item:[]}
  ]
  return (
    <div className="wrapper">
    <Navbar columns={columns}/>
    <AddCourse/>
    </div>
  )
}

export default withRouter(TeacherCenter)
