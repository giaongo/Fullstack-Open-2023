import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote, addNewAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from "../services/anecdotes"
import { displayNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    // function triggers action dispatching for adding new anecdote
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        dispatch(addAnecdote(content))
        dispatch(displayNotification(`you added '${content}'`, 5000))
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