import { useState, useEffect, useRef } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Toggleble from './components/Toggleble';
import blogService from './services/blogs';
import { useDispatch } from 'react-redux';
import { displayNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [update, setUpdate] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');

  const blogFormRef = useRef();

  const logoutUser = () => {
    setUser('');
    setToken('');
    window.localStorage.clear();
  };

  const createNewBlog = async (title, author, url) => {
    const result = await blogService.addNewBlog(token, { title, author, url });
    try {
      setUpdate(!update);
      blogFormRef.current.toggleVisibility();
      dispatch(
        displayNotification(
          {
            message: `a new blog '${result.data.title}' by ${result.data.author} added`,
            status: 'success',
          },
          5000,
        ),
      );
    } catch (error) {
      dispatch(
        displayNotification(
          {
            message: error.message,
            status: 'error',
          },
          5000,
        ),
      );
      throw new Error('ErrorAddingNewBlog' + error);
    }
  };

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('user');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser({ name: loggedInUser.name, id: loggedInUser.id });
      setToken(loggedInUser.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user ? (
        <LoginForm setUser={setUser} setToken={setToken} />
      ) : (
        <>
          <span>{user.name} logged in</span>
          <button
            id="logoutBtn"
            style={{ marginLeft: 10 }}
            onClick={logoutUser}
          >
            Logout
          </button>
          <Toggleble buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlogForm createNewBlog={createNewBlog} />
          </Toggleble>

          <BlogsDisplay
            token={token}
            user={user}
            update={update}
            setUpdate={setUpdate}
          />
        </>
      )}
    </div>
  );
};

export default App;
