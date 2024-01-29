import  { useState, useEffect } from 'react';
import { randomId } from '@mieuteacher/meomeojs';
import './main.scss';
import {readExcelFile,writeExcelFile} from './ReadExcel.jsx';


export default function StudentManagement() {
  const [fixedUsers, setFixedUsers] = useState(initialFixedUsers);
  const [current, setCurrent] = useState(null);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  })

    const handleChangeFile = (e) => {
      setCurrent(e.target);
    }
  const [newUserInfo, setNewUserInfo] = useState({
    name: '',
    age: 0,
    email: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addHandle = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId ? { ...user, ...newUserInfo } : user
      );
      setUsers(updatedUsers);
      setNewUserInfo({
        name: '',
        age: 0,
        email: '',
        image: '',
      });
      setIsEditing(false);
      setEditingUserId(null);
    } else {
      const isNameDuplicate = users.some((user) => user.name === newUserInfo.name);
      if (isNameDuplicate) {
        alert('Tên học sinh đã tồn tại!');
        return;
      }

      const newUser = {
        id: randomId(),
        ...newUserInfo,
      };

      setUsers([...users, newUser]);
      setNewUserInfo({
        name: '',
        age: 0,
        email: '',
        image: '',
      });
    }
  };
  const deleteHandle = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };
  const editHandle = (userId) => {
    const editedUser = users.find((user) => user.id === userId);
    setNewUserInfo({ ...editedUser });
    setIsEditing(true);
    setEditingUserId(userId);
  };
  const cancelEdit = () => {
    setNewUserInfo({
      name: '',
      age: 0,
      email: '',
      image: '',
    });
    setIsEditing(false);
    setEditingUserId(null);
  };

  return (
    <div>
      <div>
        <h1>Quản lý Học sinh</h1>
        <form onSubmit={addHandle}>
          <input
            type="text"
            placeholder="Nhập tên học sinh"
            value={newUserInfo.name}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Nhập tuổi học sinh"
            value={newUserInfo.age}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, age: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Nhập email học sinh"
            value={newUserInfo.email}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Nhập URL ảnh học sinh"
            value={newUserInfo.image}
            onChange={(e) => setNewUserInfo({ ...newUserInfo, image: e.target.value })}
            required
          />
          <button type="submit">{isEditing ? 'SAVE' : 'ADD'}</button>
        </form>
      </div>
      <div><input type="file" onChange ={handleChangeFile}></input>
      <button onClick={handleReadExcelFile}>Đọc file Excel</button>
      <button onClick={createExcelFile}>Xuất file Excel</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>AGE</th>
            <th>EMAIL</th>
            <th>IMAGE</th>
            <th>TOOL</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.image} alt={user.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>
                <button onClick={() => deleteHandle(user.id)}>DELETE</button>
                <button onClick={() => editHandle(user.id)}>EDIT</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div>
          <button onClick={cancelEdit}>Hủy</button>
        </div>
      )}
    </div>
  );
}
