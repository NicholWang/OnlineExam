import React from 'react'
import "./style.scss"
import Logo from "../../img/center.png"
import {Divider} from "@material-ui/core"
import DrawerItem from "../DrawerItem"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {v4 as uuidv4} from "uuid"
function Navbar(props) {
  const {columns} = props;
  return (
    <div className="nav-bar">
      <div className="nav-title">
        <img src={Logo} alt=""/>
        <h4>OnlineExam</h4>
      </div>
      <Divider className="horizon"/>
      {
        columns.map(item => {
          return <DrawerItem {...item} key={uuidv4()}/>
        })
      }
      <div className="hide">
      <KeyboardArrowLeftIcon/>
      </div>
     
    </div>
  )
}

export default Navbar
