import { useQuery } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'
import axios from 'axios'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

 

  const fetchAllAnecdotesResult = useQuery("anecdotes", getAnecdotes, {retry: false})

  console.log(fetchAllAnecdotesResult)

  if(fetchAllAnecdotesResult.isLoading) {
    return <div>Server is loading...</div>
  }

  if(fetchAllAnecdotesResult.isError) {
    return <div>anecdote service not available due to problem in server</div>
  }
  const anecdotes = fetchAllAnecdotesResult.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
