import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const addAnecdote = (newAnecdote) => {
    return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const updateAnecdote = (anecdote) => {
    return axios.put(baseUrl + `/${anecdote.id}`, anecdote). then(res => res.data)
}