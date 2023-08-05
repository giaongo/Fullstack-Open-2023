import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () => {
    return axios.get('http://localhost:3001/anecdotes').then(res => res.data)
}