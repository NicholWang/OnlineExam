import React ,{useState}from 'react';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Button, MenuItem } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Axios from 'axios'
import './style.scss'


function getModalStyle() {
  const top = 60;
  const left = 65;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none'
  },
}));

const mapState = ({user}) => (
  {teacher_name: user.currentUser.user}
)

export default function AddCourseModal(props) {
  const classes = useStyles();
  const {teacher_name} = useSelector(mapState)
  // console.log(teacher_name)
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [subject_name,setSubjectName] = useState("");
  const [subject_period,setSubjectPeriod] = useState("");
  const [subject_character, setSubjectCharacter] = useState("必修");
  const [teach_class,setTeachClass] = useState("");
  const {parentCallback} = props;
  // console.log(parentCallback)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    const data = {
      subject_name,
      subject_period,
      subject_character,
      teach_class,
      teacher_name
    }
    Axios.post('http://127.0.0.1:8000/add_subject',data)
      .then(res => {
        if(res.data === '班级不存在!'){
          alert(res.data)
          setSubjectName("")
          setSubjectPeriod("")
          setSubjectCharacter("必修")
          setTeachClass("")
          handleClose()
        }else{
          setSubjectName("")
          setSubjectPeriod("")
          setSubjectCharacter("必修")
          setTeachClass("")
          handleClose()
          parentCallback(data)
        }
      }).catch(err => console.log(err))
  }
  const body = (
    <div style={modalStyle} className={`${classes.paper} course_modal`}>
      <form className="add_course_form">
      <div className="t-form-item">
      <TextField
              label="课程名"
              className="t-form-text"
              value={subject_name}
              onChange={(e) => setSubjectName(e.target.value)}
            />
      </div>
      <div className="t-form-item">
      <TextField
              label="课时"
              className="t-form-text"
              value={subject_period}
              onChange={(e) => setSubjectPeriod(e.target.value)}
            />
      </div>
      <div className="t-form-item">
      <TextField
              label="课程性质"
              select
              className="t-form-text"
              value={subject_character}
              onChange={(e) => setSubjectCharacter(e.target.value)}
      >
        <MenuItem value="必修">必修</MenuItem>
        <MenuItem value="选修">选修</MenuItem>
      </TextField>
      </div>
      <div className="t-form-item">
      <TextField
              label="教授班级"
              className="t-form-text"
              value={teach_class}
              onChange={(e) => setTeachClass(e.target.value)}
            />
      </div>
      <div className="t-form-item">
        <Button variant="outlined" color="primary" onClick={handleClick}>
          添加
        </Button>
      </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="add-c">
      <Button variant="contained" onClick={handleOpen} className="add-t">
        添加课程
      </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}