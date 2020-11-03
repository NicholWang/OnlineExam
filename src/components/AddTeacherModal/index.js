import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Button } from "@material-ui/core";
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


export default function AddTeacherModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [teacher_num,setTeacherNum] = useState("");
  const [teacher_name, setTeacherName] = useState("");
  const {parentCallback} = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      teacher_num,
      teacher_name
    }
    Axios.post('http://127.0.0.1:8000/add_tempteacher', data)
      .then(res => {
       if(res.data === 'success'){
        setTeacherName('')
        setTeacherNum('')
        setOpen(false)
        console.log(res.data);
        parentCallback(res.data)
       }
      })
      .catch(err => console.log(err))
  }
  const body = (
    <div style={modalStyle} className={`${classes.paper} class_modal`}>
      <form className="add_teacher_form">
      <div className="t-form-item">
      <TextField
              label="职编"
              className="t-form-text"
              value={teacher_num}
              onChange={(e) => setTeacherNum(e.target.value)}
            />
      </div>
      <div className="t-form-item">
      <TextField
              label="教师名"
              className="t-form-text"
              value={teacher_name}
              onChange={(e) => setTeacherName(e.target.value)}
            />
      </div>
      <div className="add-teacher">
        <Button variant="outlined" color="primary" onClick={handleClick}>
          添加
        </Button>
      </div>
      </form>
    </div>
  );

  return (
    <div>
      <div className="add-t">
      <Button variant="contained" onClick={handleOpen} className="add-t">
        添加教师
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