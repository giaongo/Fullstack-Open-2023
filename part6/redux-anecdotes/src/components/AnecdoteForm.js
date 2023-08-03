import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from "../services/anecdotes"
const AnecdoteForm = ({displayNotification}) => {
    const dispatch = useDispatch()
    // function triggers action dispatching for adding new anecdote
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        const newAnecdote = await anecdoteService.addAnecdote(content)
        dispatch(addNewAnecdote(newAnecdote))
        displayNotification(`you added '${content}'`)
    }
    
    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addNew}>
        <div><input name="anecdote"/></div>
        <button>create</button>
        </form>
    </>
    )
}

export default AnecdoteForm