import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const SingleAcnecdote = ({anecdote, displayNotification}) => {
    const dispatch = useDispatch()

      // function triggers action dispatching for incrementing vote
    const vote = (id, content) => {
        dispatch(voteAnecdote(id))
        displayNotification(`you voted '${content}'`)
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
const AnecdoteList = ({displayNotification}) => {

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
        key={element.id} 
        displayNotification={displayNotification}/>)}
    </>
  )
}

export default AnecdoteList