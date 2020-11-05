import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import AddCourse from '../AddCourse'
import AddQuestions from '../AddQuestions'
import Navbar from '../Navbar'
import QuestionList from '../QuestionList'
import './style.scss'

const mapState = ({user}) => ({
  title: user.title
})
function TeacherCenter(props) {
  const {user} = props.location.state
  const {title} = useSelector(mapState)
  const columns = [
    {title: `欢迎你,${user}`, item:[]},
    {title:"添加课程",item: []},
    {title:"添加题目",item: []},
    {title:"查看题库",item:[]},
    {title:"学生管理",item :["查询成绩","修改成绩"]},
    {title:"创建考试",item:[]},
    {title:"批阅试卷",item:[]}
  ]
  const renderMainbody = (title) => {
    switch(title){
      case '添加课程':
        return <AddCourse/>
      case `欢迎你,${user}`:
        return <AddCourse/>
      case '添加题目':
        return <AddQuestions/>
      case '查看题库':
        return <QuestionList/>
      default:
        return <AddCourse/>
    }
  }
  return (
    <div className="wrapper">
    <Navbar columns={columns}/>
    {renderMainbody(title)}
    </div>
  )
}

export default withRouter(TeacherCenter)
