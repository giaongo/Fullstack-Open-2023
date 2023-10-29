import { useEffect } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from './reducers/userReducer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import User from './components/User';
import Detail from './components/Detail';
import AppBar from '@mui/material/AppBar';
import { Button, Toolbar, Typography } from '@mui/material';
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
      <AppBar style={{ marginBottom: 50 }}>
        <Toolbar>
          <Button color="inherit">
            <Link to="/" style={{ padding: 10, color: '#fff' }}>
              <Typography textAlign="center">blogs</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/users" style={{ padding: 10, color: '#fff' }}>
              users
            </Link>
          </Button>

          {userInfo.id === '' ? (
            <Button color="inherit">
              <Link to="/login" style={{ padding: 10 }}>
                login
              </Link>
            </Button>
          ) : (
            <span>
              {userInfo.name} logged in
              <button
                id="logoutBtn"
                style={{ marginLeft: 10 }}
                onClick={logoutUser}
              >
                Logout
              </button>
            </span>
          )}
        </Toolbar>
      </AppBar>

      <Notification />

      <Routes>
        <Route
          path="/"
          element={userInfo.id !== '' ? <BlogsDisplay /> : <LoginForm />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
