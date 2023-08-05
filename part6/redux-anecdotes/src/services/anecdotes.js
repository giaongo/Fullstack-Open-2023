import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const addAnecdote = async(newAnecdote) => {
    const newObject = {
        content: newAnecdote, 
        votes: 0
    }
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const increaseVoteAnecdote = async(anecdoteToUpdate) => {
    const response = await axios.put(baseUrl + `/${anecdoteToUpdate.id}`, anecdoteToUpdate)
    return response.data

}
// eslint-disable-next-line 
export default {getAll, addAnecdote, increaseVoteAnecdote} 