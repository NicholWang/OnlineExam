import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import AddCourseModal from '../AddCourseModal'
import Appbar from '../Appbar'
import CourseCard from '../CourseCard'
import './style.scss'
import {v4 as uuidv4} from "uuid"
import Axios from 'axios'


const mapState = ({user}) => (
  {teacher_name: user.currentUser.user}
)

function AddCourse() {
  const [courselist,setCourseList] = useState([]);
  const {teacher_name} = useSelector(mapState);
  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/get_subject',{params:{
      teacher_name: teacher_name
    }}).then(res => {
      console.log(res.data)
      if(typeof(res.data) === 'object'){
        setCourseList([...courselist,...res.data])
      }
    }).catch(err => console.log(err))
  },[])
  const handleCallback = (childata) =>{
    setCourseList([
      ...courselist,
      childata
    ])
  }
  return (
    <div className="class-wrapper">
      <Appbar user={"教师"}/>
      <AddCourseModal parentCallback={handleCallback}/>
      <div className="card-info-wrapper">
        {
          courselist.map(course => {
            return <CourseCard course={course} key={uuidv4()}/>
          })
        }
      </div>
    </div>
  )
}

export default AddCourse
