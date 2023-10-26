import { useState, useEffect, useRef } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Toggleble from './components/Toggleble';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const blogFormRef = useRef();

  const logoutUser = () => {
    setUser('');
    setToken('');
    window.localStorage.clear();
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
            <NewBlogForm data={blogFormRef} />
          </Toggleble>

          <BlogsDisplay token={token} user={user} />
        </>
      )}
    </div>
  );
};

export default App;
