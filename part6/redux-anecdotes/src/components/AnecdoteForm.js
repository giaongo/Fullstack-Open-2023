import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = ({displayNotification}) => {
    const dispatch = useDispatch()
    // function triggers action dispatching for adding new anecdote
    const addNew = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ""
        console.log("new anecdote is ",content);
        dispatch(addNewAnecdote(content))
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