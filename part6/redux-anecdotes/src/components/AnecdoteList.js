import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, voteSingleAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const SingleAcnecdote = ({anecdote}) => {
    const dispatch = useDispatch()

      // function triggers action dispatching for incrementing vote
    const vote = (id, content) => {
        dispatch(voteSingleAnecdote(id))
        dispatch(displayNotification(`you voted '${content}'`, 5000))
    }
    return (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
    )
}
const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
      if(state.filter !== 'ALL' && state.filter !== '') {
        return state.anecdote.filter(anecdote => anecdote.content.includes(state.filter))
      }
      return state.anecdote
    })

  return (
    <>
        {anecdotes.map(element => <SingleAcnecdote 
        anecdote = {element} 
        key={element.id} />)}
    </>
  )
}

export default AnecdoteList