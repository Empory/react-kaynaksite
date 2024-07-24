import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/react/register.php', {
        name,
        email,
        password,
        role
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/react/login.php', {
        email,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost/react/upload.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/react/get_users.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  return (
    <div className="">
    
        <form onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">U</option>
            <option value="admin">A</option>
          </select>
          <button type="submit">R</button>
        </form>
        <form onSubmit={loginUser}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">L</button>
        </form>
        <form onSubmit={uploadFile}>
          <h2>Upload File</h2>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button type="submit">U</button>
        </form>
        {message && <p>{message}</p>}
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      
    </div>
  );
};

export default App;
