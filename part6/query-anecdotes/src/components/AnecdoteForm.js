import { useMutation, useQueryClient } from "react-query"
import { addAnecdote } from "../serverRequests/requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(addAnecdote, {
    // this is called if the addAnecdote returns a success
    onSuccess: (newAnecdote) => {
      // refetch all anecdotes by making another http GET request -> not an optimized option with large database
       // queryClient.invalidateQueries("anecdotes")

      // the better option -> manually update the query state maintained by the React Query
      const anecdotes = queryClient.getQueryData("anecdotes")
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // does the mutation with new data added from the form
    newAnecdoteMutation.mutate({content, votes: 0})
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
