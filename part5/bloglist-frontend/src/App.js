import { useState, useEffect } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [token,setToken] = useState(null);
  const [update, setUpdate] = useState(false);

  const logoutUser = () => {
    setUser('');
    setToken('');
    window.localStorage.clear();
  };

  useEffect((() => {
    const loggedInUserJSON =  window.localStorage.getItem('user');
    if(loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser({ name: loggedInUser.name });
      setToken(loggedInUser.token);
    }
  }), []);

  return (
    <div>
      <h2>blogs</h2>
      {!user
        ? <LoginForm setUser={setUser} setToken={setToken}/>
        : (
          <>
            <span>{user.name} logged in</span>
            <button style={{ marginLeft:10 }} onClick={logoutUser}>Logout</button>
            <NewBlogForm token = {token} updateFunction={{ update, setUpdate }}/>
            <BlogsDisplay token={token} update={update}/>
          </>
        ) }
    </div>
  );
};

export default App;
