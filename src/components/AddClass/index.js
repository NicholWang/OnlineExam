import React, {useEffect,useState} from 'react'
import './style.scss'
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
import Appbar from '../Appbar';
import SimpleModal from '../Modal';
import Axios from 'axios'
import UpdateModal from '../UpdateModal';
import {v4 as uuidv4} from 'uuid'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AddClass(props) {
  const classes = useStyles();
  const [rows,setRows] = useState([])
  
  useEffect(() => {
    const GetData = async () => {
      let {data} = await Axios.get('http://127.0.0.1:8000/get_class',{params:{
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
      }else{
        setRows([])
      }
    }
    GetData()
  },[])
  const handleCallback = (childata) => {
    console.log(childata);
    alert('添加成功')
    // setRows([...rows,childata])
  }
  const handleUpdate = async (childata) => {
    const {class_name, stu_count} = childata;
    console.log(childata);
    const data = {
      class_name,
      stu_count
    }
    Axios.post('http://127.0.0.1:8000/update_class',data)
      .then(async res => {
        if(res.data === 'success'){
          await setRows(rows.map(row => {
            if(row.class_name === class_name){
              console.log('符合');
              row.class_name = class_name
              row.stu_count = stu_count
            }
            return row
          }))
          console.log(rows);
        }
      }).catch(err => console.log(err))
  }
  const handleDelete =  (data) => {
      const r = window.confirm('确认删除此班级?')
      if(r){
        Axios.get('http://127.0.0.1:8000/del_class',{params:{
          class_name: data
        }}).then(async res => {
          if(res.data === 'success'){
            await setRows(rows.filter(row => row.class_name !== data))
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
    let {data} = await Axios.get('http://127.0.0.1:8000/get_class',{params:{
      page_num: page_num
    }})
    if(data !== "page dont't exist"){
    data = JSON.parse(data).map(item => {
      return item.fields
    })
    setRows([
      ...data
    ])
  }else{
    setRows([])
  }
  }
  return (
    <div className="class-wrapper">
      <Appbar user={'管理员'}/>
      <div className="class-inner">
     <div className="add-class"> 
     <SimpleModal parentCallback={handleCallback}/>
    </div>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>编号</TableCell>
            <TableCell align="right">班级</TableCell>
            <TableCell align="right">总人数</TableCell>
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
                <TableCell align="right">{row.class_name}</TableCell>
                <TableCell align="right">{row.stu_count}</TableCell>
                <TableCell align="right">
                <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(row.class_name)}>
                  删除
                </Button>
                <UpdateModal item={row} parentUpdate={handleUpdate}/>
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
      //  page={page}
       onClick={handlePage}/>

    </div>
    </div>
  )
}

export default React.memo(AddClass)
