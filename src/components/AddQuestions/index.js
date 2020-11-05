import React ,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {Input,  Radio, Button, Paper, TextField, MenuItem} from '@material-ui/core'
import Appbar from '../Appbar';
import {v4 as uuidv4} from 'uuid'
import './style.scss'
import Axios from 'axios'

const mapState = ({user}) => (
  {teacher_name: user.currentUser.user}
)

export default function AddQuestions() {
  const [selectedValue, setSelectedValue] = useState('a');
  const [question_content,setQuestionContent] = useState("");
  const [answera,setAnswerA] = useState("");
  const [answerb,setAnswerB] = useState("");
  const [answerc,setAnswerC] = useState("");
  const [answerd,setAnswerD] = useState("");
  const {teacher_name} = useSelector(mapState)
  const [rows,setRows] = useState([])
  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/get_course',{params:{
      teacher_name: teacher_name
    }}).then(res => setRows([...rows,...res.data]))
    .catch(err => console.log(err))
  },[])
  const [currentclasstype,setCurrentClassType] = useState("");
  const mapanswer = [
    {'a': answera},
    {'b': answerb},
    {'c': answerc},
    {'d': answerd},
  ];
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    // console.log(mapanswer);
    // console.log(selectedValue);
    // console.log(question_content);
    // console.log(mapanswer.filter(item => item[selectedValue]));
    const right_answer = mapanswer.filter(item => item[selectedValue])[0]
    const data = {
      question_content,
      mapanswer,
      right_answer,
      teacher_name,
      currentclasstype
    }
    Axios.post('http://127.0.0.1:8000/add_question', data)
      .then(res => {
        alert(res.data)
        setSelectedValue('a')
        setQuestionContent("")
        setAnswerA("")
        setAnswerB("")
        setAnswerC("")
        setAnswerD("")
        setCurrentClassType("")
      })
      .catch(err => console.log(err))
  }
  return (
      <div className="class-wrapper">
        <Appbar user={"教师"}/>
        <div className="select-class-type">
        <TextField
          id="standard-select-currency"
          select
          label="请选择题目分类"
          value={currentclasstype}
          onChange={e => setCurrentClassType(e.target.value)}
          className="select_item"
        >
          <MenuItem key={uuidv4()} value={"请选择题目分类"} disabled>请选择题目分类</MenuItem>
          {
            rows.length > 0 &&
             rows.map(row => <MenuItem key={uuidv4()} value={row}>
             {row}</MenuItem>)
          }
        </TextField>
        </div>
        <Paper elevation={3} className="add-ques-form">
        <form>
          <div className="ques-item">
          <TextField
          id="outlined-multiline-static"
          label="题目描述"
          multiline
          rows={5}
          placeholder="请在此输入题目描述"
          variant="outlined"
          className="simple-text"
          value={question_content}
          onChange={e => setQuestionContent(e.target.value)}
        />
          </div>
          <div className="ques-item">
          <Radio
                checked={selectedValue === 'a'}
                onChange={handleChange}
                value="a"
                name="radio-button-demo"
              />
            <label htmlFor="answera">A  </label>
            <Input 
              id="answera" 
              value={answera} 
              onChange={e => setAnswerA(e.target.value)}
              autoComplete="off"
              className="simple-text"
              />
          </div>
          <div className="ques-item">
          <Radio
                checked={selectedValue === 'b'}
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
              />
            <label htmlFor="answerb">B  </label>
            <Input 
              id="answerb" 
              value={answerb} 
              onChange={e => setAnswerB(e.target.value)}
              autoComplete="off"
              className="simple-text"
              />
          </div>
          <div className="ques-item">
          <Radio
                checked={selectedValue === 'c'}
                onChange={handleChange}
                value="c"
                name="radio-button-demo"
              />
            <label htmlFor="answerc">C  </label>
            <Input 
              id="answerc" 
              value={answerc} 
              onChange={e => setAnswerC(e.target.value)}
              autoComplete="off"
              className="simple-text"
              />
          </div>
          <div className="ques-item">
          <Radio
                checked={selectedValue === 'd'}
                onChange={handleChange}
                value="d"
                name="radio-button-demo"
              />
            <label htmlFor="answerd">D  </label>
            <Input 
              id="answerd" 
              value={answerd} 
              onChange={e => setAnswerD(e.target.value)}
              autoComplete="off"
              className="simple-text"
              />
          </div>
          <div className="add-btn">
            <Button variant="contained" color="primary" onClick={handleAdd} size="large">
              添加题目
            </Button>
          </div>
          </form>
      </Paper>
    </div>
  );
}
