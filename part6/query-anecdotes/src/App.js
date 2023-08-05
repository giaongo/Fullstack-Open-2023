import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './serverRequests/requests'

const App = () => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess:(votedAnecdote) => {
      // refetch all anecdotes by making another http GET request -> not an optimized option with large database
      // queryClient.invalidateQueries("anecdotes")

      // the better option -> manually update the query state maintained by the react query
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", 
      anecdotes
      .map(anecdote => anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote )
      .sort((firstAnecdote, secondAnecdote) => secondAnecdote.votes - firstAnecdote.votes)
      )
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    // does the mutation with the updated anecdote with incremented vote number
    updateAnecdoteMutation.mutate(updatedAnecdote)
  }

  // fetch all anecdotes query
  const fetchAllAnecdotesResult = useQuery("anecdotes", getAnecdotes, {retry: false, refetchOnWindowFocus:false})

  console.log(fetchAllAnecdotesResult)

  // if isLoading is true
  if(fetchAllAnecdotesResult.isLoading) {
    return <div>Server is loading...</div>
  }

  // if isError is true
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
