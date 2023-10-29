import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { login } from '../reducers/userReducer';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
    <Container component="main" maxWidth="xs" style={{ marginTop: '120px' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <div style={{ margin: 10 }}>
            <TextField
              type="text"
              value={username}
              name="username"
              autoComplete="on"
              id="username"
              label="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div style={{ margin: 10 }}>
            <TextField
              type="password"
              value={password}
              name="password"
              id="password"
              label="Password"
              autoComplete="on"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
