import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
