import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import './WorkList.css';
const WorkList = () => {
  const [newTask, setNewTask] = useState('');
  const [workList, setWorkList] = useState(() => {
    const storedWorkList = localStorage.getItem('workList');
    return storedWorkList ? JSON.parse(storedWorkList) : [];
  });

  useEffect(() => {
    localStorage.setItem('workList', JSON.stringify(workList));
  }, [workList]);

  const handleAdd = () => {
    if (newTask.trim() !== '') {
      setWorkList([...workList, newTask]);
      setNewTask('');
    }
  };
  const handleDelete = (index) => {
    const newWorkList = [...workList];
    newWorkList.splice(index, 1);
    setWorkList(newWorkList);
  };
  const handleEdit = (index) => {
    const updated = prompt('Nhập công việc mới:', workList[index]);
    if (updated !== null) {
      const newWorkList = [...workList];
      newWorkList[index] = updated;
      setWorkList(newWorkList);
    }
  };
  return (
    <div className="Container">
      <h1 className="text-center">Danh Sách Công Việc</h1>
      <form>
        <div className="jobs">
          <div className="jobs-item">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập Tên Công Việc"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <div className="jobs-item">
            <button type="button" className="button" onClick={handleAdd}>
              Thêm
            </button>
          </div>
        </div>
      </form>
      {workList.length === 0 ? (
        <div className="job-image">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/021/975/492/small/search-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png"
            alt="No tasks found"
          />
        </div>
      ) : (
        <ul className="task-list">
          {workList.map((task, index) => (
            <li key={index}>
              {task}
              <div className="job-icon">
                <div className="job-icon-item">
                  <CreateIcon onClick={() => handleEdit(index)} />
                </div>
                <div className="job-icon-item">
                  <DeleteIcon onClick={() => handleDelete(index)} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default WorkList;
