import React from 'react'
import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar'
import './style.scss'

function TeacherCenter(props) {
  console.log(props);
  const {user} = props.location.state
  return (
    <div className="wrapper">
    <Navbar user={user}/>
    </div>
  )
}

export default withRouter(TeacherCenter)
