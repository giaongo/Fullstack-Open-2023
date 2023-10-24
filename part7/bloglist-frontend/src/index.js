import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import updateReducer from './reducers/updateReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    update: updateReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
