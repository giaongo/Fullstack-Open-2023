import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/anecdoteReducer";
import filterReducer from "../reducers/filterReducer";

export const store = configureStore({
    reducer: {
        anecdote: reducer, 
        filter: filterReducer
    }
})

