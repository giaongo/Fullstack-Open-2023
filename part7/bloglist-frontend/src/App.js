import { useState, useEffect, useRef } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Toggleble from './components/Toggleble';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from './reducers/userReducer';

const App = () => {
  const userInfo = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    window.localStorage.clear();
  };

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('user');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      dispatch(loginUser(loggedInUser));
      console.log('user info is', userInfo);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {userInfo.id === '' ? (
        <LoginForm />
      ) : (
        <>
          <span>{userInfo.name} logged in</span>
          <button
            id="logoutBtn"
            style={{ marginLeft: 10 }}
            onClick={logoutUser}
          >
            Logout
          </button>
          <Toggleble buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlogForm data={blogFormRef} />
          </Toggleble>

          <BlogsDisplay />
        </>
      )}
    </div>
  );
};

export default App;
