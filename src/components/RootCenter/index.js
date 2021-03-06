import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import AddClass from '../AddClass'
import AddStudent from '../AddStudent'
import AddTeacher from '../AddTeacher'
import Navbar from '../Navbar'
import './style.scss'

const mapState = ({user}) => ({
    title: user.title
  })
function RootCenter(props) {
  const {user} = props.location.state;
  const {title} = useSelector(mapState);
  console.log('object',title);
  // console.log(typeof(title));
  // console.log(title.title)
  const columns = [
    {title: `欢迎你,${user}`, item:[]},
    {title:"添加班级",item: []},
    {title: '添加教师',item:[]},
    {title: '添加学生', item:[]}
  ]
  const conditionalRender = (title) => {
    switch(title){
      case '添加班级':
        return <AddClass/>
      case `欢迎你,${user}`:
        return <AddClass/>
      case '添加教师':
        return <AddTeacher/> 
      case '添加学生':
        return <AddStudent/>
      default:
        return <AddClass/>
    }
  }
  return (
    <div className="wrapper">
      <Navbar columns={columns}/>
      
      {
        conditionalRender(title)
      }
    </div>
  )
}

export default withRouter(RootCenter)
