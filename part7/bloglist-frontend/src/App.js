import { useEffect } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from './reducers/userReducer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
const App = () => {
  const userInfo = useSelector((state) => state.user);

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
    <Router>
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
            <Routes>
              <Route path="/blogs" element={<BlogsDisplay />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
