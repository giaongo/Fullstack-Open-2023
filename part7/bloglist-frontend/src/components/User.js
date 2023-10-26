import { useParams } from 'react-router-dom';
import userService from '../services/user';
import { useState, useEffect } from 'react';
import { List, dense, ListItem, ListItemText } from '@mui/material';
const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await userService.getUserById(id);
      setUser(response.data);
    } catch (error) {
      console.error('error getting user', error.message);
    }
  };

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <div>
      {user !== null && (
        <div>
          <h2>{user.username}</h2>
          <p>Added blogs</p>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
