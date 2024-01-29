
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
export default function WorkList () {

  return (

    <div>
     
   
   <h1 className="text-center">Danh Sách Công Việc</h1>
  <form>
   <div>
     <div>
      <input
       type="text" className="form-control"
        placeholder="Nhập Tên Công Việc"

         />
     </div>
      <div>
        <button type="button" className="button">Thêm</button>
      </div>
   </div>

  </form>
  <CreateIcon/>
  <DeleteIcon/>
    </div>
  ) 
}
