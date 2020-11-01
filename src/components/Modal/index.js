import React ,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from '@material-ui/core'
import './style.scss'
import Axios from 'axios'


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


export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [class_name,setClassName] = useState('');
  const [stu_count,setStuCount] = useState('');
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
      class_name,
      stu_count
    }
    Axios.post('http://127.0.0.1:8000/add_class', data)
      .then(res => {
        setOpen(false)
        console.log(res.data);
        parentCallback(res.data)
      })
      .catch(err => console.log(err))
  }

  const body = (
    <div style={modalStyle} className={`${classes.paper} class_modal`}>
    <form className="form-group">
          <div className="form-item">
            <label htmlFor="stu_class">班级</label>
            <input 
            type="text" 
            id="stu_class" 
            className="form-input"
            value={class_name}
            onChange={e => setClassName(e.target.value)}
          />
          </div>
          <div className="form-item">
            <label htmlFor="class_num">总人数</label>
            <input 
            type="text" 
            id="class_num"
            className="form-input" 
            value={stu_count}
            onChange={e => setStuCount(e.target.value)}
          />
          </div>
          <button className="add_in" onClick={handleClick}>添加</button>
        </form>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        添加班级
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}