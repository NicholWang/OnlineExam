import React ,{useState}from 'react'
import {useDispatch} from 'react-redux'
import {v4 as uuidv4} from "uuid"
import './style.scss'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {setRootActive} from '../../Redux/User/user.action'

function DrawerItem(props) {
  const [toggle,setToggle] = useState(false)
  const {title,item} = props;
  const dispatch = useDispatch();
  // console.log(item.length)
  const handleClick = (title) => {
    console.log('hhh');
    dispatch(setRootActive(title))
  }
  return (
    <div className="drawer-wrapper">
      <div className="line" onClick={() => setToggle(!toggle)}>
        <li className="line-title" onClick={() => handleClick(title)}>{title}</li>
        {
          item.length > 0 && (
        toggle ? <KeyboardArrowDownIcon className="p"/> :
         <KeyboardArrowUpIcon className="p"/>)
        }
      </div>
      {
        item.length > 0 &&
        <div className="trans">
        <div className={toggle ? "content-active" : "content"}>
        {
          item.map(ititle => {
          return <li key={uuidv4()} className="li-item">{ititle}</li>
          })
        }
      </div>
      </div>
      }
      
    </div>
  )
}

export default DrawerItem
