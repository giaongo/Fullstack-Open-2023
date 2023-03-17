import { useState, useEffect } from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';

const LoginForm = ({ setUser, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await loginService.login({ username, password });
      window.localStorage.setItem('user', JSON.stringify(result.data));
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
LoginForm.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func
};
export default LoginForm;