import React from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import AddClass from '../AddClass'
import AddTeacher from '../AddTeacher'
import Navbar from '../Navbar'
import './style.scss'

const mapState = ({user}) => ({
    title: user.title
  })
function RootCenter(props) {
  const {user} = props.location.state;
  const {title} = useSelector(mapState);
  // console.log(typeof(title));
  console.log(title.title)
  const columns = [
    {title: `欢迎你,${user}`, item:[]},
    {title:"添加班级",item: []},
    {title: '添加教师',item:[]}
  ]
  return (
    <div className="wrapper">
      <Navbar columns={columns}/>
      {
        title === '添加班级' ? <AddClass/> : <AddTeacher/>
      }
    </div>
  )
}

export default withRouter(RootCenter)
