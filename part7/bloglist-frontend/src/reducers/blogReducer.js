import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { displayNotification } from './notificationReducer';
import { setUpdates } from './updateReducer';
const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addNewBlog(state, action) {
      const newState = state.concat(action.payload);
      console.log('newstate is ', newState);
      return newState;
    },
  },
});

export const getAllBlogs = () => {
  const token = JSON.parse(window.localStorage.getItem('user')).token;
  return async (dispatch) => {
    const response = await blogService.getAll(token);
    response.sort(
      (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes,
    );
    dispatch(setBlogs(response));
  };
};

export const createBlog = (newBlog) => {
  const token = JSON.parse(window.localStorage.getItem('user')).token;
  console.log('new blog to add is', newBlog);
  return async (dispatch) => {
    try {
      const response = await blogService.addNewBlog(token, newBlog);
      dispatch(addNewBlog(response.data));
      dispatch(setUpdates());
      dispatch(
        displayNotification(
          {
            message: `a new blog '${response.data.title}' by ${response.data.author} added`,
            status: 'success',
          },
          5000,
        ),
      );
    } catch (error) {
      dispatch(
        displayNotification(
          {
            message: error.message,
            status: 'error',
          },
          5000,
        ),
      );
    }
  };
};

export const { setBlogs, addNewBlog } = blogSlice.actions;
export default blogSlice.reducer;
