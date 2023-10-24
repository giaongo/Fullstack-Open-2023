import { useState } from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';

const LoginForm = ({ setUser, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await loginService.login({ username, password });
      console.log('result', result);
      window.localStorage.setItem('user', JSON.stringify(result.data));
      setUser({ name: result.data.name });
      setToken(result.data.token);
      dispatch(
        displayNotification(
          { message: 'Login Successfully', status: 'success' },
          5000,
        ),
      );
    } catch (error) {
      console.error('ErrorFormLogin', error);
      dispatch(
        displayNotification({ message: error.message, status: 'error' }, 5000),
      );
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
          id="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          autoComplete="on"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit" id="submitLogin">
        Submit
      </button>
    </form>
  );
};
LoginForm.propTypes = {
  setUser: PropTypes.func,
  setToken: PropTypes.func,
};
export default LoginForm;
