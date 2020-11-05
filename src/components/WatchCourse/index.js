import React , {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Axios from 'axios'
import Appbar from '../Appbar'
import './style.scss'

const mapState = ({user}) => (
  {student_name: user.currentUser.user}
)

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function WatchCourse() {
  const classes = useStyles();
  const [rows,setRows] = useState([])
  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/get_owncourse',{params:{
      student_name: student_name
    }}).then(async res => {
      console.log(res.data)
      console.log(typeof(res.data))
      await setRows([...rows,...res.data])
    })
      .catch(err => console.log(err))
  },[])
  const {student_name} = useSelector(mapState)
  return (
    <div className="class-wrapper">
       <Appbar user={"学生"}/>
       <div className="stu-course-card">
         {
           rows.length > 0 && rows.map(row => {
              return (
                <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    课程名称： {row['subject_name']}
                  </Typography>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    课时：{row['subject_period']}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    课程性质：{row['subject_character']}
                  </Typography>
                  <Typography variant="body2" component="p">
                   授课老师： {row['teacher_name']}
                  </Typography>
                </CardContent>
              </Card>
              )
           })
         
         }
       
       </div>
    </div>
  )
}

export default WatchCourse
