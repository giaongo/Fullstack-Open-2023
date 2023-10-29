import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
const initialState = {
  token: '',
  username: '',
  name: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      return {
        token: action.payload.token,
        username: action.payload.username,
        name: action.payload.name,
        id: action.payload.id,
      };
    },
    logoutUser(state) {
      return initialState;
    },
  },
});

export const login = (user) => {
  return async (dispatch, getState) => {
    const response = await loginService.login(user);
    window.localStorage.setItem('user', JSON.stringify(response.data));
    dispatch(loginUser(response.data));
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutUser());
  };
};

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
