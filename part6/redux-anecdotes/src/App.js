import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { hideNoti, showNoti } from './reducers/notificationReducer'
import { useEffect } from 'react'
import anecdoteService from "./services/anecdotes"
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(
      anecdotes => dispatch(setAnecdotes(anecdotes)) 
    )
  }, [dispatch])

  // function to display the notification in 5s
  const displayNotification = (message) => {
      dispatch(showNoti(message))
      setTimeout(() => {
        dispatch(hideNoti())
      }, 2000)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList displayNotification = {displayNotification}/>
      <AnecdoteForm displayNotification = {displayNotification} />
    </div>
  )
}

export default App