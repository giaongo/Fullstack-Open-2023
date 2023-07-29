import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const SingleAcnecdote = ({anecdote}) => {
    const dispatch = useDispatch()

      // function triggers action dispatching for incrementing vote
    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }
    return (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
    )
}
const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
  return (
    <>
        {anecdotes.map(element => <SingleAcnecdote anecdote = {element} key={element.id}/>)}
    </>
  )
}

export default AnecdoteList