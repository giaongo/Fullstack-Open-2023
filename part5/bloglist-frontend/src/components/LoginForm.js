import { useState } from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';

const LoginForm = ({ setUser, setToken, setNotificationStatus, setNotificationMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await loginService.login({ username, password });
      console.log('result', result);
      window.localStorage.setItem('user', JSON.stringify(result.data));
      setUser({ name: result.data.name });
      setToken(result.data.token);
      setNotificationStatus('success');
      setNotificationMessage('Login Successfully');
    } catch (error) {
      console.error('ErrorFormLogin', error);
      setNotificationStatus('error');
      setNotificationMessage(error.message);
    } finally {
      setTimeout(() => {
        setNotificationStatus('');
        setNotificationMessage('');
      },4000);
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
LoginForm.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
  setNotificationStatus: PropTypes.func,
  setNotificationMessage: PropTypes.func
};
export default LoginForm;