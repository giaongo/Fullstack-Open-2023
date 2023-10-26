import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/userReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(login({ username, password }));
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

export default LoginForm;
