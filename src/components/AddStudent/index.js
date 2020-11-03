import React ,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination'
import Appbar from '../Appbar'
import {v4 as uuidv4} from 'uuid'
import Axios from 'axios'
import AddStudentModal from '../AddStudentModal';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AddStudent() {
  const classes = useStyles();
  const [rows,setRows] = useState([])
  
  useEffect(() => {
    const GetData = async () => {
      let {data} = await Axios.get('http://127.0.0.1:8000/get_tempstu',{params:{
        page_num: 1
      }})
      if(data !== "page dont't exist"){
        data = JSON.parse(data).map(item => {
          return item.fields
        })
        console.log(data);
        setRows([
          ...rows,
          ...data
        ])
        console.log('rows',rows);
      }else{
        setRows([])
      }
    }
    GetData()
  },[])
  const handleCallback = (childata) => {
    if(childata === 'success'){
      alert('添加成功!')
    }else{
      alert('添加失败,对应的班级不存在!')
    }
 
  }
  const handleDelete =  (data) => {
    const r = window.confirm('确认删除此学生?')
    if(r){
      console.log(data)
      Axios.get('http://127.0.0.1:8000/del_tempstu',{params:{
        stu_num: data
      }}).then(async res => {
        if(res.data === 'success'){
          await setRows(rows.filter(row => row.stu_num !== data))
          console.log(rows);
          console.log(res.data)
          alert('删除成功!')
        }
      })
          .catch(err => console.log(err))
    }
}

const handlePage = async (e) => {
  e.preventDefault()
  const page_num = e.target.ariaLabel.split(' ')[3]
  let {data} = await Axios.get('http://127.0.0.1:8000/get_tempstu',{params:{
    page_num: page_num
  }})
  if(data !== "page dont't exist"){
  data = JSON.parse(data).map(item => {
    return item.fields
  })
  console.log()
  setRows([
    ...data
  ])
}else{
  setRows([])
}
}
  return (
    <div className="class-wrapper">
      <Appbar user={"管理员"}/>
      <div className="class-inner">
      <AddStudentModal parentCallback={handleCallback}/>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>编号</TableCell>
            <TableCell align="right">学号</TableCell>
            <TableCell align="right">姓名</TableCell>
            <TableCell align="right">班级</TableCell>
            <TableCell align="right">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.length > 0 && rows.map((row,index) => (
              <TableRow key={uuidv4()}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.stu_num}</TableCell>
                <TableCell align="right">{row.stu_name}</TableCell>
                <TableCell align="right">{row.stu_class}</TableCell>
                <TableCell align="right">
                 <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(row.stu_num)}>
                  删除
                </Button>      
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination 
      count={6} 
      defaultPage={1} 
      siblingCount={1}
       boundaryCount={1} 
       className="page"
       onClick={handlePage}
       />
      </div>
    </div>
  )
}

export default AddStudent
