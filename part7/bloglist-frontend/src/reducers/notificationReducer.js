import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  status: '',
  isVisible: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNoti(state, action) {
      console.log('Action ', action);
      return {
        message: action.payload.message,
        status: action.payload.status,
        isVisible: true,
      };
    },
    hideNoti(state, action) {
      return initialState;
    },
  },
});

export const { showNoti, hideNoti } = notificationSlice.actions;
export default notificationSlice.reducer;

// React Thunk pattern receives Redux dispatch and getState methods as parameters.
// show and hide the notification after 5s
export const displayNotification = (data, timeout) => {
  return async (dispatch, getState) => {
    dispatch(showNoti(data));
    setTimeout(() => {
      dispatch(hideNoti());
    }, timeout);
  };
};
