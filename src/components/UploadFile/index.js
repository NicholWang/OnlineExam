import React ,{useRef} from 'react'
import Axios from "axios"
import './style.scss'
function UploadFile() {
  const fileRef = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    const myfile = fileRef.current.files[0];
    formdata.append('myfile',myfile)

    Axios.post(" http://127.0.0.1:8000/upload",formdata)
        .then(res => console.log(res))
        .catch(err => console.log(err))
  }
  return (
    <div>
      <input type="file" name="myfile" ref={fileRef}/>
      <button onClick={handleClick}>上传</button>
    </div>
  )
}

export default UploadFile
