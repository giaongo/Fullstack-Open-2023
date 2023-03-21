import { useState, useEffect, useRef } from 'react';
import BlogsDisplay from './components/BlogsDisplay';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Toggleble from './components/Toggleble';
import blogService from './services/blogs';
const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [update, setUpdate] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const blogFormRef = useRef();

  const logoutUser = () => {
    setUser('');
    setToken('');
    window.localStorage.clear();
  };

  const handleBlogFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await blogService.addNewBlog(token, { title, author, url });
      if(result.status === 201) {
        setUpdate(!update);
        blogFormRef.current.toggleVisibility();
        console.log('result added log is', result);
        setTitle('');
        setAuthor('');
        setUrl('' );
        setNotificationStatus('success');
        setNotificationMessage(`a new blog '${result.data.title}' by ${result.data.author} added`);
      }
    } catch(error) {
      console.error('ErrorAddingNewBlog', error);
      setNotificationStatus('error');
      setNotificationMessage(error.message);
    } finally {
      setTimeout((() => {
        setNotificationStatus('');
        setNotificationMessage('');
      }),4000);
    }
  };

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('user');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser({ name: loggedInUser.name, id:loggedInUser.id });
      setToken(loggedInUser.token);
    }
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {notificationStatus ? (
        <Notification
          status={notificationStatus}
          message={notificationMessage}
        />
      ) : null}
      {!user ? (
        <LoginForm
          setUser={setUser}
          setToken={setToken}
          setNotificationStatus={setNotificationStatus}
          setNotificationMessage={setNotificationMessage}
        />
      ) : (
        <>
          <span>{user.name} logged in</span>
          <button style={{ marginLeft: 10 }} onClick={logoutUser}>
            Logout
          </button>
          <Toggleble buttonLabel="create new blog" ref={blogFormRef}>
            <NewBlogForm
              handleFormSubmmision = {handleBlogFormSubmit}
              title={title}
              author={author}
              url={url}
              setTitle={setTitle}
              setAuthor={setAuthor}
              setUrl={setUrl}
            />
          </Toggleble>

          <BlogsDisplay
            token={token}
            user={user}
            update={update}
            setUpdate={setUpdate}/>
        </>
      )}
    </div>
  );
};

export default App;
