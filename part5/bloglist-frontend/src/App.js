import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const result = await loginService.login({ username, password });
        setUser({ name: result.data.name });
        setToken(result.data.token);
        console.log('result is', result);
      } catch (error) {
        console.error('ErrorFormLogin', error);
      }
    };
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            autoComplete="on"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            autoComplete="on"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };

  const BlogsDisplay = () => {
    const [blogs, setBlogs] = useState([]);
    const getAllBlogs = async () => {
      try {
        const response = await blogService.getAll(token);
        console.log('blogs response', response);
        setBlogs(response);
      } catch (error) {
        console.error('ErrorInGettingBlogs', error);
      }
    };
    useEffect(() => {
      getAllBlogs();
    }, []);
    return (
      <>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      {!user
        ? <LoginForm />
        : (
          <>
            <p>{user.name} logged in</p>
            <BlogsDisplay/>
          </>
        ) }
    </div>
  );
};

export default App;
