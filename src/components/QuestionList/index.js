import React ,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {v4 as uuidv4} from 'uuid'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const mapState = ({user}) => (
  {teacher_name: user.currentUser.user}
)
function QuestionList() {
  const {teacher_name} = useSelector(mapState)
  const classes = useStyles();
  const [rows,setRows] = useState([])
  const mapChar = ['A','B','C','D']
  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/get_question_list',{params:{
      teacher_name: teacher_name
    }}).then(async res => {
      // console.log(res.data);
      const data = JSON.parse(res.data)
      // console.log(data[0]['question_content']);
      // data[0]['mapanswer'].map(item => console.log(item[Object.keys(item)[0]]))
      data.map(row => {
        console.log(row['question_content']);
        row['mapanswer'].map(answer => console.log(answer[Object.keys(answer)[0]]))
      })
      await setRows([...rows,...data])
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className="class-wrapper">
      <div className="ques-inner">
    <div className={classes.root}>
      {
       rows.map((row, index) => {
        return (<Accordion key={uuidv4()}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{index+1}.  {row['question_content']}</Typography>
      </AccordionSummary>
      {
        row['mapanswer'].map((answer, index) => {
          return (
            <AccordionDetails>
            <Typography>
          {mapChar[index]}.  {answer[Object.keys(answer)[0]]}
            </Typography>
          </AccordionDetails>
          )
        })
      }
     
         {
           Object.keys(row['right_answer']).map(key => {
           return  (<AccordionDetails>
           <Typography>
             正确答案:{key.toUpperCase()}.  {row['right_answer'][key]}
             </Typography>
     </AccordionDetails>)
           })
         }
        
      </Accordion>)
       })
      }
  </div>
  </div>
  </div>
  )
}

export default QuestionList
