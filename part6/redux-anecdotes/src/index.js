import React from 'react'
import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer, { addNewAnecdote } from './reducers/anecdoteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'
import Filter from './components/Filter'

const allReducer = combineReducers({
  anecdote: reducer, 
  filter: filterReducer
})

const store = createStore(allReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)