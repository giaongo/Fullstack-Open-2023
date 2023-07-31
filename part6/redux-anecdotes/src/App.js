import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { hideNoti, showNoti } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

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