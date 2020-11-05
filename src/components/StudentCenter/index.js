import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar'
import WatchCourse from '../WatchCourse'


const mapState = ({user}) => ({
  title: user.title
})
function StudentCenter(props) {
  const {user} = props.location.state
  const {title} = useSelector(mapState)
  const columns = [
    {title: `欢迎你,${user}`, item:[]},
    {title:"查看课程",item: []},
    {title:"考试计划",item: []},
    {title: "查看成绩", item: []}
  ]
  const renderMainbody = (title) => {
    switch(title){
      case '查看课程':
        return <WatchCourse/>
      case `欢迎你,${user}`:
        return <WatchCourse/>
      default:
        return <WatchCourse/>
    }
  }
  return (
    <div className="wrapper">
    <Navbar columns={columns}/>
    {renderMainbody(title)}
    </div>
  )
}

export default withRouter(StudentCenter)
