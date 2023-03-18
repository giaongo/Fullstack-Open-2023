import { useState, useEffect, useRef } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Toggleble from './components/Toggleble';
const App = () => {
  const [user, setUser] = useState(null);
  const [token,setToken] = useState(null);
  const [update, setUpdate] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');
  const blogFormRef = useRef();
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
      {notificationStatus ?  (
        <Notification status={notificationStatus} message={notificationMessage}/>
      ): null}
      {!user
        ? <LoginForm
          setUser={setUser}
          setToken={setToken}
          setNotificationStatus = {setNotificationStatus}
          setNotificationMessage={setNotificationMessage}/>
        : (
          <>
            <span>{user.name} logged in</span>
            <button style={{ marginLeft:10 }} onClick={logoutUser}>Logout</button>
            <Toggleble buttonLabel = "create new blog" ref={blogFormRef}>
              <NewBlogForm
                token = {token}
                updateFunction={{ update, setUpdate }}
                setNotificationStatus = {setNotificationStatus}
                setNotificationMessage = {setNotificationMessage}
                blogFormRef={blogFormRef} />
            </Toggleble>

            <BlogsDisplay token={token} update={update}/>
          </>
        ) }

    </div>
  );
};

export default App;
