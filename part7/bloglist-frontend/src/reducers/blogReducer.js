import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { displayNotification } from './notificationReducer';
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
    increaseLikeNumber(state, action) {
      const newState = state.map((data) =>
        data.id === action.payload.id ? action.payload : data,
      );
      return newState;
    },
    deleteBlog(state, action) {
      console.log('action payload is', action.payload);
      return state.filter((data) => data.id !== action.payload.id);
    },
  },
});

export const getAllBlogs = () => {
  return async (dispatch, getState) => {
    const response = await blogService.getAll(getState().user.token);
    response.sort(
      (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes,
    );
    dispatch(setBlogs(response));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch, getState) => {
    try {
      const response = await blogService.addNewBlog(
        getState().user.token,
        newBlog,
      );
      dispatch(addNewBlog(response.data));
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

export const updateLike = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.updateLike(blog);
      console.log('response from updateLike', response.data);
      dispatch(increaseLikeNumber(response.data));
      dispatch(
        displayNotification(
          {
            message: `Like increase for ${blog.title}`,
            status: 'success',
          },
          5000,
        ),
      );
    } catch (error) {
      console.error('updateLikeError', error);
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

export const removeBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      const response = await blogService.deleteBlog(
        blog.id,
        getState().user.token,
      );
      dispatch(deleteBlog(blog));
      dispatch(
        displayNotification(
          {
            message: `${blog.title} is removed successfully`,
            status: 'success',
          },
          5000,
        ),
      );
    } catch (error) {
      console.error('delete blog error', error);
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

export const { setBlogs, addNewBlog, increaseLikeNumber, deleteBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
